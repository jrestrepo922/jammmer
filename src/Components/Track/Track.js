 import React, { Component } from 'react'
 import './Track.css'; 
 
 export default class Track extends Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this); 
        this.removeTrack = this.removeTrack.bind(this);
    }


    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }



     render() {
         return (
            <div className="Track">
                <div className="overlay">
                    <input type="image" src={this.props.track.image} alt="album"
                    style={{height: "auto", width:"100%"}} className="thumbnail"/>
                   
                    <span className="playBtn"><ion-icon name="play"></ion-icon></span>
                
                  
                    
                </div>
                <div className="Track-information">

                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>

                </div>
                {this.renderAction()}
            </div>
         )
     }
 }
 
//  <input type="image" src="http://wptf.com/wp-content/uploads/2014/05/play-button.png" width="50" height="50" alt=""/>