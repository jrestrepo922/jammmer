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
        {name: "Lamento Boliviano", artist: "Enanitos Verdes",  album:"En Vivo",  id:"2"}
      ]
    };
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist/> 
          </div>
        </div>
      </div>
      );
  }

}

export default App;
