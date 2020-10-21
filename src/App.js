import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import MapComponent from './components/Map'
import { Clusters } from './components/Clusters'
import Spinner from './components/UI/Spinner/Spinner'
import Modal from './components/UI/Modal/Modal'
import { useDataQuery } from '@dhis2/app-runtime'

const CLUSTER_NAME = 'Cluster name'
const CLUSTER_DESCRIPTION = 'Cluster description'
const CLUSTER_TYPE = 'Cluster type'
const CLUSTER_START_DATE = 'Cluster - Start date and time of cluster'
const CLUSTER_END_DATE = 'Cluster - End date and time of cluster'
const CLUSTER_LOCATION = 'Cluster location (geographical)'

const queryClusters = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: {
            paging: 'false',
            ou: 'uoPrVFsvJiY',
            program: 'plTOwEXJrb6',
            fields: [
                'orgUnit',
                'trackedEntityInstance',
                'lastUpdated',
                'created',
                'attributes',
                'relationships',
            ],
        },
    },
}

const MyApp = () => {
    const [cluster, setPage] = useState(true)

    const { loading, error, data } = useDataQuery(queryClusters)

    const clusters = []

    if (data) {
        const entityInstances =
            data.trackedEntityInstances.trackedEntityInstances
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
            }
            clusterObject.tei = cluster.trackedEntityInstance
            console.log('new cluster')
            clusterObject.relationships = cluster.relationships.length

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
            console.log(clusterObject.location)
            return clusterObject
        })
        clusters.push(...clustersArray)
    }

    const setClusterHandler = () => {
        setPage(true)
    }

    const setMapHandler = () => {
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
                        onClick={setMapHandler}
                        active={!cluster}
                    ></MenuItem>
                </Menu>
            </nav>

            <main className={styles.main}>
                <div>
                    {error && <Modal>{error}</Modal>}
                    {loading && <Spinner />}{' '}
                    {cluster && clusters && <Clusters clusters={clusters} />}
                </div>
                <div>
                    {!cluster && (
                        <MapComponent
                            clusters={clusters}
                            isBig
                            relationships={10}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default MyApp
