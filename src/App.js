import React, { useReducer } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import styles from './App.module.css'
import Map from './components/Map'
import { Clusters } from './components/Clusters'

function reducer(state, action) {
    switch (action.type) {
        case 'CLUSTERS': {
            return { cluster: true, map: false }
        }
        case 'MAP': {
            return { cluster: false, map: true }
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }
    }
}
const initialState = {
    cluster: true,
    map: false,
}

const queryClusters = {
    trackedEntityInstances: {
        resource: 'trackedEntityInstances',
        params: {
            paging: 'false',
            ou: 'uoPrVFsvJiY',
            fields: ['orgUnit', 'lastUpdated', 'created'],
        },
    },
}

const MyApp = () => {
    const { data } = useDataQuery(queryClusters)
    console.log('data', data)
    const [{ cluster, map }, dispatch] = useReducer(reducer, initialState)

    return (
        <div className={styles.container}>
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>
                    <MenuItem
                        label={i18n.t('Cluster')}
                        dataTest="menu-programs"
                        onClick={() => dispatch({ type: 'CLUSTERS' })}
                    ></MenuItem>
                    <MenuItem
                        label={i18n.t('Map')}
                        dataTest="menu-dataSets"
                        onClick={() => dispatch({ type: 'MAP' })}
                    ></MenuItem>
                </Menu>
            </nav>

            <main className={styles.main}>
                <div>{cluster && <Clusters />}</div>
                <div>{map && <Map />}</div>
            </main>
        </div>
    )
}

export default MyApp
