import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

import {
    Menu,
    MenuItem,
    MenuSectionHeader,
    CircularLoader,
    Modal,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui'
import styles from './App.module.css'
import MapComponent from './components/Map'
import { Clusters } from './components/Clusters'
import { useDataQuery } from '@dhis2/app-runtime'

const CLUSTER_NAME = 'Cluster name'
const CLUSTER_DESCRIPTION = 'Cluster description'
const CLUSTER_TYPE = 'Cluster type'
const CLUSTER_START_DATE = 'Cluster - Start date and time of cluster'
const CLUSTER_END_DATE = 'Cluster - End date and time of cluster'
const CLUSTER_LOCATION = 'Cluster location (geographical)'
const AVDAL_LOCATION = {
    lat: 62.07166667,
    lng: 10.62222222,
}

const queryClusters = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: {
            paging: 'false',
            ou: 'uoPrVFsvJiY',
            program: 'plTOwEXJrb6',
            fields: '*',
        },
    },
}

const MyApp = () => {
    console.log('App component')
    const [cluster, setPage] = useState(true)
    const [clickedTei, setTei] = useState(null)
    const [location, setLocation] = useState(AVDAL_LOCATION)
    const [isError, setIsError] = useState(false)

    const { loading, error, data } = useDataQuery(queryClusters)

    const clusters = []

    if (data) {
        const entityInstances =
            data.trackedEntityInstances.trackedEntityInstances
        console.log(data)
        const clustersArray = entityInstances.map(cluster => {
            const clusterObject = {
                tei: '',
                name: '-',
                description: '-',
                type: '-',
                startDate: '-',
                endDate: '-',
                location: { lat: null, lng: null },
                relationships: 0,
                status: '-',
                orgUnitName: '-',
            }
            clusterObject.tei = cluster.trackedEntityInstance
            clusterObject.relationships = cluster.relationships.length
            clusterObject.status = cluster.enrollments[0].status
            clusterObject.orgUnitName = cluster.enrollments[0].orgUnitName

            cluster.attributes.map(attr => {
                const { value, displayName } = attr
                if (displayName === CLUSTER_NAME) clusterObject.name = value
                if (displayName === CLUSTER_DESCRIPTION)
                    clusterObject.description = value
                if (displayName === CLUSTER_TYPE) clusterObject.type = value
                if (displayName === CLUSTER_START_DATE)
                    clusterObject.startDate = value
                if (displayName === CLUSTER_END_DATE)
                    clusterObject.endDate = value
                if (displayName === CLUSTER_LOCATION) {
                    const location = value
                        .replace(/[^0-9 |.|,]/g, '')
                        .split(',')
                    clusterObject.location.lat = location[1]
                    clusterObject.location.lng = location[0]
                }
            })

            return clusterObject
        })
        clusters.push(...clustersArray)
    } else if (error) {
        setIsError(true)
    }

    const setClusterHandler = () => {
        setPage(true)
    }

    const clearError = () => {
        setIsError(false)
    }

    const setMapHandler = (location, tei) => {
        setLocation({ lat: location.lat, lng: location.lng })
        setTei(tei)
        setPage(false)
    }
    return (
        <div className={styles.container}>
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>
                    <MenuItem
                        label={i18n.t('Cluster')}
                        dataTest="menu-programs"
                        onClick={setClusterHandler}
                        active={cluster}
                    ></MenuItem>
                    <MenuItem
                        label={i18n.t('Map')}
                        dataTest="menu-dataSets"
                        onClick={() => setMapHandler(location)}
                        active={!cluster}
                    ></MenuItem>
                </Menu>
            </nav>

            <main className={styles.main}>
                <div>
                    {isError && (
                        <Modal
                            className={styles.Modal}
                            dataTest="dhis2-uicore-modal"
                            show={isError}
                            onClose={clearError}
                            position="middle"
                            small
                        >
                            <ModalTitle dataTest="dhis2-uicore-modaltitle">
                                {error.type}
                            </ModalTitle>
                            <ModalContent>{error.message}</ModalContent>
                        </Modal>
                    )}
                    {loading && (
                        <CircularLoader dataTest="dhis2-uicore-circularloader" />
                    )}
                    {cluster && data && (
                        <Clusters
                            onOpenMap={setMapHandler}
                            clusters={clusters}
                        />
                    )}
                </div>
                <div>
                    {!cluster && (
                        <MapComponent
                            clusters={clusters}
                            zoomLocation={location}
                            clickedClusterTei={clickedTei}
                            isBig
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default MyApp
