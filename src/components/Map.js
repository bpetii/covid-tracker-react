import React, { useState } from 'react'
import L from 'leaflet'
import styles from '../App.module.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import leafGreen from '../assets/leaf-green.png'

const greenIcon = L.icon({
    iconUrl: leafGreen,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})

const MapComponent = props => {
    const [state, setState] = useState({
        greenIcon: {
            lat: props.location.lat,
            lng: props.location.lng,
        },

        zoom: 13,
    })

    const positionGreenIcon = [state.greenIcon.lat, state.greenIcon.lng]
    return (
        <Map
            className={props.isBig ? styles.mapBig : styles.mapSmall}
            center={positionGreenIcon}
            zoom={state.zoom}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={positionGreenIcon} icon={greenIcon}>
                <Popup>{props.name}</Popup>
            </Marker>
        </Map>
    )
}

export default MapComponent
