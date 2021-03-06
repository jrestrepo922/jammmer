import './App.css';
import { Component } from 'react'; 
import Playlist  from '../Playlist/Playlist';
import SearchBar  from '../SearchBar/SearchBar'; 
import SearchResults  from '../SearchResults/SearchResults'; 
import Spotify from '../../util/Spotify'
import PlaylistList from '../PlaylistList/PlaylistList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
    
      playlistName: "",
      playlistTracks: [],
      playlistId: null

    }
    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this); 
    this.updatePlaylistName = this.updatePlaylistName.bind(this); 
    this.savePlaylist = this.savePlaylist.bind(this); 
    this.search = this.search.bind(this); 
    this.selectPlaylist = this.selectPlaylist.bind(this); 

  }

  addTrack(track){
    let trackNotInPlayListTracks = true; 
    this.state.playlistTracks.forEach(playlistTrack => {
      if(track.id === playlistTrack.id){
        trackNotInPlayListTracks = false; 
      }
    });
    if(trackNotInPlayListTracks){
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
    }
  }

  removeTrack(track){
    const newPlaylistTracks = this.state.playlistTracks.filter((playlistTrack) => {
      return playlistTrack.id !== track.id; 
    }); 
    this.setState({
      playlistTracks: newPlaylistTracks
    })
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }
  
  savePlaylist(){
    let playlistId = this.state.playlistId
    const trackUris = this.state.playlistTracks.map(track  => track.uri);
    // uri is used to uniquely identified songs in Spotify
    if(!trackUris.length ){
      return
    }
    Spotify.savePlaylist(this.state.playlistName, trackUris, playlistId).then(() => {
      this.setState({
        playlistName: 'New Playlist', 
        playlistTracks: []
      })
    })

  }

  search(term){
    // array of object tracks are return. After they are return set the state of searchResults equals to the array of object tracks. 
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  selectPlaylist(playlistId){
    let playlistName = document.getElementsByClassName(playlistId)[0].children[1].children[0].innerText
    Spotify.getPlaylistTracks(playlistId).then( playlistTracks => {
      this.setState({
        playlistTracks: playlistTracks,
        playlistName: playlistName,
        playlistId: playlistId
      })
    })
  }


 

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            /> 
          </div>
          <PlaylistList selectPlaylist={this.selectPlaylist}/>
        </div>
      </div>
      );
  }

}

export default App;
