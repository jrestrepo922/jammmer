import React, { Component } from 'react';
import './PlaylistDisplay';

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
                <div className="overlay">
                    <input type="image" src={this.props.image} alt="album"
                    style={{height: "auto", width:"100%"}} className="thumbnail"/>
                </div>
                <div className="Track-information" >
                    <h3>{this.props.name}</h3>
                    
                </div>
            </div>
        )
    }
}

// <p>{this.props.owner}</p>