import React, { Component } from 'react';
import './PlaylistDisplay.css';

export default class PlaylistDisplay extends Component {
    constructor(props){
        super(props); 
        this.handleOnClick = this.handleOnClick.bind(this); 
    }

    handleOnClick(){
        this.props.selectPlaylist(this.props.playlistId); 
    }



    render() {
        

        return (
            <div className={`PlaylistDisplay ${this.props.playlistId}`} onClick={this.handleOnClick}>
                    <input type="image" src={this.props.image} alt="album"
                     className="thumbnail"/>
                <div className="playlist-information" >
                    <h3>{this.props.name}</h3>
                    <p>{this.props.owner}</p>
                </div>
            </div>
        )
    }
}

