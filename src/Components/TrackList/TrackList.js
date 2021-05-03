import React, { Component } from 'react'
import Track from '../Track/Track'

export default class TrackList extends Component {
    render() {
        const tracks = this.props.tracks.map(
            (track) => {
                return <Track name={track.name} artist={track.artist} album={track.album} key={track.id}/> 
            }
        )


        return (
            <div className="TrackList">
                 {tracks}
            </div>
        )
    }
}
