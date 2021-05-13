 import React, { Component } from 'react'
 import './Track.css'; 
 import playImg from './Play-Button-PNG-Image.png'
 import pauseImg from './Pause-Icon.png'

 
 export default class Track extends Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this); 
        this.removeTrack = this.removeTrack.bind(this);
        this.handleClick= this.handleClick.bind(this); 
        this.renderActionPlayButtonAvaliable = this.renderActionPlayButtonAvaliable.bind(this);
        this.handleEndOfTrack = this.handleEndOfTrack.bind(this);
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

    handleClick(event){
        const image = event.target; 
        const sampleTrack = event.target.nextElementSibling; 
        if(sampleTrack.paused){
            sampleTrack.play();  
            image.src = `${pauseImg}`; 
        } else {
            sampleTrack.pause(); 
            image.src = `${playImg}`
        }    
    }

    handleEndOfTrack(event){
        const image = event.target.previousSibling; 
        image.src =`${playImg}`
    }

    renderActionPlayButtonAvaliable(){
        if(this.props.track.sample){
            return (
            <span className="playBtn"><img src={playImg} alt="playbutton" onClick={this.handleClick}/>
                <audio className="sample-track" onEnded={this.handleEndOfTrack}>
                    <source src={this.props.track.sample}></source>
                </audio>
            </span>
            )

        }
    }





     render() {
         return (
            <div className="Track">
                <div className="overlay">
                    <input type="image" src={this.props.track.image} alt="album"
                    style={{height: "auto", width:"100%"}} className="thumbnail"/>
                   {this.renderActionPlayButtonAvaliable()}
                </div>
                <div className="Track-information">

                        <h4>{this.props.track.name}</h4>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>

                </div>
                {this.renderAction()}
            </div>
         )
     }
 }
 
//  <input type="image" src="http://wptf.com/wp-content/uploads/2014/05/play-button.png" width="50" height="50" alt=""/>
// https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.pngall.com%2Fplay-button-png%2Fdownload%2F45083&psig=AOvVaw3_xkLYQbnq2MtH1BCGDZN1&ust=1620919161319000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiw-cy4xPACFQAAAAAdAAAAABAK
// <span className="playBtn"><ion-icon name="play"></ion-icon></span>