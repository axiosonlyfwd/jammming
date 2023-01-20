import React from 'react';
import TrackList from './Components/TrackList/TrackList';
import './SearchResults.css';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist />
            </div>
        );
    }
}