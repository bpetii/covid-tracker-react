import React, { useState, useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import Map from './components/Map'
import { Clusters } from './components/Clusters'

const MyApp = () => {
    const [cluster, setPage] = useState()
    useEffect(() => {
        setPage(true)
    }, [])
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
                <div>{cluster && <Clusters />}</div>
                <div>{!cluster && <Map />}</div>
            </main>
        </div>
    )
}

export default MyApp
