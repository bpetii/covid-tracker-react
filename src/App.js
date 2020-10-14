import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'

const query = {
    me: {
        resource: 'me',
    },
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
    const { error, loading, data } = useDataQuery(queryClusters)
    console.log('data', data)
    return (
        <div className={classes.container}>
            <DataQuery query={query}>
                {({ error, loading, data }) => {
                    if (error) return <span>ERROR</span>
                    if (loading) return <span>...</span>
                    return (
                        <>
                            <h1>{i18n.t('Hello {{name}}')}</h1>
                            <h3>{i18n.t('Welcome to DHIS2!')}</h3>
                        </>
                    )
                }}
            </DataQuery>
        </div>
    )
}

export default MyApp
