import React, { Component } from 'react'; 
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


export default class Playlist extends Component {
    constructor(props){
        super(props); 
        this.handleNameChange = this.handleNameChange.bind(this);
    }


    handleNameChange(e){
        this.props.onNameChange(e.target.value); 
    }

    renderActionInput(){
        if(this.props.playlistName){
            return   <input value={this.props.playlistName} onChange={this.handleNameChange}/>
        } else {
            return   <input value="New PlayList" onChange={this.handleNameChange}/>
        }
    }

    render() {

        return (
            <div className="Playlist">
                {this.renderActionInput()}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/> 
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
