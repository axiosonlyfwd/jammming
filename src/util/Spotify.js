import { get } from "http";

let accessToken;

const clientId = '';
const redirectURI = 'http://localhost:3000/';
const scope = "playlist-modify-public";
const responseType = "token";
const authEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectURI}`;

window.location.href = authEndpoint;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");

            return accessToken;
        } else {
            const accessUrl = authEndpoint;
            window.location = accessUrl;
        }
    },
    
    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
            { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        };
                    });
                }
            });
    },

    savePlaylist(playlistName, playlistTracks) {
        let accessToken = this.getAccessToken();
        let headers = { Authorization: `Bearer ${accessToken}` };
        let userId = '';

        // make a request that returns the user's spotify username
        fetch(`https://api.spotify.com/v1/me?fields=id&access_token=${accessToken}`, {
            headers: headers,
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
        })
        .catch(error => {
            console.log(error);
        });

        // use the user Id to make a POST request that creates a new playlist in the user's account and returns a playlist ID
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name: playlistName,
                tracks: playlistTracks
            }),
            json: true,            
        })
        .then(response => response.json())
        .then(jsonResponse => {
            playlistId = jsonResponse.id
        })
        .catch(error => {
            console.log(error);
        });
    }

};

export default Spotify;