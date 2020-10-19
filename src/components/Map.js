import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'

export class MapComponent extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                />

                <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUyWvLnK0uBqZxIESctUiZJ68dzYVn3Lk',
})(MapComponent)
