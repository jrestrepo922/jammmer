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
        const h3Style={
            width: "95%",
            borderBottom: "1px solid rgba(256, 256, 256, 0.8)"
        }

        return (
            <div className='PlaylistDisplay'>
                <h3 style={h3Style}
                onClick={this.handleOnClick}
                >{this.props.name}</h3>
            </div>
        )
    }
}
