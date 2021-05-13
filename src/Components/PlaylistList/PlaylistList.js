import React, { Component } from 'react';
import './PlaylistList.css';
import Spotify from '../../util/Spotify';
import PlaylistDisplay from '../PlaylistDisplay/PlaylistDisplay';

export default class PlaylistList extends Component {
    constructor(props){
        super(props); 
        this.state = {
            playlists: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    
    componentDidMount(){
        Spotify.getUserPlaylist().then( playlists => {
            this.setState({
                playlists: playlists
            })
        })
    }

    render() {
        
        let playlistToDisplay = this.state.playlists.map(playlist => {
            return <PlaylistDisplay  name={playlist.name} playlistId={playlist.playlistId} key={playlist.playlistId} selectPlaylist={this.props.selectPlaylist}
            owner={playlist.owner} image={playlist.image}
            />
        })

        return (
            <div className="PlaylistList">
                <h2>Current Playlists</h2>
                {playlistToDisplay}
            </div>
            
        )
    }
}
