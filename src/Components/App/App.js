import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import Playlist from './Components/Playlist/Playlist';
import SearchResults from './Components/SearchResults/SearchResults';

function App() {
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <!-- Add a SearchBar component -->
          <div class="App-playlist">
            <!-- Add a SearchResults component -->
            <!-- Add a Playlist component -->
          </div>
        </div>
      </div>
    );
  };
}

export default App;