import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import Spinner from '../UI/Spinner/Spinner'

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
} from '@dhis2/ui-core'

import Accordion from '../Accordion/Accordion'

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
            ],
        },
    },
}

const Clusters = () => {
    const clusters = []

    const { loading, error, data } = useDataQuery(queryClusters)
    console.log('data', data)

    if (data) {
        const clustersArray = data.trackedEntityInstances.trackedEntityInstances
        clustersArray.map(cluster => {
            const clusterObject = {
                tei: '',
                name: '-',
                description: '-',
                type: '-',
                startDate: '-',
                endDate: '-',
                location: null,
            }
            clusterObject.tei = cluster.trackedEntityInstance

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
                if (displayName === CLUSTER_LOCATION)
                    clusterObject.location = value
            })
            clusters.push(clusterObject)
        })
    }

    return (
        <div>
            {console.log('clutsers component')}
            {loading && <Spinner />}

            {data && (
                <Table dataTest="dhis2-uicore-table">
                    <TableHead dataTest="dhis2-uicore-tablehead">
                        <TableRowHead dataTest="dhis2-uicore-tablerowhead">
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Name
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Description
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Type
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Start
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                End
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead"></TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody dataTest="dhis2-uicore-tablebody">
                        {clusters.map(attr => {
                            return (
                                <Accordion key={attr.tei} attributes={attr} />
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
export default Clusters
