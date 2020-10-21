import React, { useState } from 'react'
import styles from '../App.module.css'
import { Map, TileLayer, Tooltip, CircleMarker } from 'react-leaflet'

const BASIC_RADIUS = 15

const MapComponent = props => {
    const [state, setState] = useState({
        centerPosition: {
            lat: 59.923914,
            lng: 10.779966,
        },

        zoom: 5,
    })

    let circleMarker = null
    if (props.clusters) {
        console.log('Map ' + props.clusters)
        circleMarker = props.clusters.map(cluster => {
            return (
                cluster.location.lng && (
                    <CircleMarker
                        key={cluster.tei}
                        color={cluster.relationships >= 5 ? 'red' : 'yellow'}
                        center={[cluster.location.lat, cluster.location.lng]}
                        radius={BASIC_RADIUS + +cluster.relationships}
                    >
                        {console.log('location: ' + cluster.location.lat)}
                        <Tooltip direction="top" offset={[10, 0]}>
                            {cluster.name + ` (${cluster.relationships})`}
                        </Tooltip>
                    </CircleMarker>
                )
            )
        })
    }

    const center = props.isBig
        ? [state.centerPosition.lat, state.centerPosition.lng]
        : [props.clusters[0].location.lat, props.clusters[0].location.lng]

    return (
        <Map
            className={props.isBig ? styles.mapBig : styles.mapSmall}
            center={center}
            zoom={state.zoom}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {circleMarker}
        </Map>
    )
}

export default MapComponent
