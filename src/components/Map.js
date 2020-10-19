import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'

export class MapComponent extends Component {
    state = {
        showingInfoWindow: false, // Hides or shows the InfoWindow
        activeMarker: {}, // Shows the active marker upon click
        selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        })

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            })
        }
    }
    render() {
        console.log(this.props.google)
        return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={this.props.location}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUyWvLnK0uBqZxIESctUiZJ68dzYVn3Lk',
})(MapComponent)
