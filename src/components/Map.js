import React, { useState, useEffect, useRef } from 'react'
import styles from '../App.module.css'
import { Map, TileLayer, Popup, Tooltip, CircleMarker } from 'react-leaflet'

import MarkerClusterGroup from 'react-leaflet-markercluster'

const BASIC_RADIUS = 15
/* zoom values */
const CLUSTER_ZOOM = 13
const DEFAULT_ZOOM = 11

const MapComponent = props => {
    console.log('Map component')
    const [zoom] = useState(DEFAULT_ZOOM)

    const setClusterColor = caseNumber => {
        switch (true) {
            case caseNumber <= 5:
                return '#fed79c'
            case 5 < caseNumber && caseNumber <= 15:
                return '#FF6602'
            case caseNumber > 15:
                return '#c62828'
            default:
                return '#c62828'
        }
    }

    function openPopup(circle) {
        if (circle && circle.leafletElement) {
            window.setTimeout(() => {
                circle.leafletElement.openPopup()
            })
        }
    }

    let circleMarker = null
    if (props.clusters) {
        circleMarker = props.clusters.map(cluster => {
            const color = setClusterColor(cluster.relationships)
            return (
                cluster.location.lng && (
                    <CircleMarker
                        key={cluster.tei}
                        ref={
                            cluster.tei === props.clickedClusterTei &&
                            props.isBig
                                ? openPopup
                                : null
                        }
                        color={color}
                        fillColor={color}
                        center={[cluster.location.lat, cluster.location.lng]}
                        radius={BASIC_RADIUS + +cluster.relationships}
                    >
                        <Tooltip
                            className={styles.text}
                            permanent
                            direction="center"
                            opacity={1}
                        >
                            {cluster.relationships}
                        </Tooltip>

                        <Popup>
                            <b>Name: </b> {cluster.name}
                            <br />
                            <b>Description: </b> {cluster.description}
                            <br />
                            <b>Cases: </b> {cluster.relationships}
                            <br />
                        </Popup>
                    </CircleMarker>
                )
            )
        })
    }
    const center = props.isBig
        ? [props.zoomLocation.lat, props.zoomLocation.lng]
        : [props.clusters[0].location.lat, props.clusters[0].location.lng]

    return (
        <Map
            className={props.isBig ? styles.mapBig : styles.mapSmall}
            center={center}
            zoom={props.clickedClusterTei ? CLUSTER_ZOOM : zoom}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                spiderLegPolylineOptions={{
                    weight: 0,
                    opacity: 0,
                }}
            >
                {circleMarker}
            </MarkerClusterGroup>
        </Map>
    )
}

export default MapComponent
