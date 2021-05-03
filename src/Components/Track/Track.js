 import React, { Component } from 'react'
 import './Track.css'; 
 
 export default class Track extends Component {


    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }



     render() {
         return (
            <div class="Track">
                <div className="Track-information">
                    <h3>{this.state.name}</h3>
                    <p>{this.state.artist} | {this.state.album}</p>
                </div>
                <button className="Track-action">+ or - will go here</button>
            </div>
         )
     }
 }
 