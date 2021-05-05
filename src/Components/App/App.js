import './App.css';
import { Component } from 'react'; 
import Playlist  from '../Playlist/Playlist';
import SearchBar  from '../SearchBar/SearchBar'; 
import SearchResults  from '../SearchResults/SearchResults'; 

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: "Tu Carcel", artist: "Enanitos Verdes",  album:"En Vivo",  id:"1"},
        {name: "Lamento Boliviano", artist: "Enanitos Verdes",  album:"En Vivo",  id:"2"},
      ],
    
      playlistName: "Rock Latino",
      playlistTracks: [
        {name: "Cara Luna", artist: "Bacilos",  album:"Sin Verguenza",  id:"3"},
        {name: "Mi Primer Millon", artist: "Bacilos",  album:"Sin Verguenza",  id:"4"}
      ],
    }
    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this); 
    this.updatePlaylistName = this.updatePlaylistName.bind(this); 
    this.savePlaylist = this.savePlaylist.bind(this); 
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
    const trackUris = this.state.playlistTracks.map(track  => track.uri);
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
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
        </div>
      </div>
      );
  }

}

export default App;
