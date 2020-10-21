import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import MapComponent from './components/Map'
import { Clusters } from './components/Clusters'

const MyApp = () => {
    const [cluster, setPage] = useState(true)

    const setClusterHandler = () => {
        setPage(true)
    }

    const setMapHandler = () => {
        setPage(false)
    }
    return (
        <div className={styles.container}>
            {console.log(cluster)}
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
                <div>{cluster && <Clusters />}</div>
                <div>
                    {!cluster && (
                        <MapComponent
                            location={{ lat: 42.5, lng: 52.1 }}
                            name={'Cluster 1'}
                            isBig
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default MyApp
