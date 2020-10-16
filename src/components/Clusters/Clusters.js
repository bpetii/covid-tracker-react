import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import Spinner from '../UI/Spinner/Spinner'
import Modal from '../UI/Modal/Modal'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@dhis2/ui-core'

import Accordion from '../Accordion/Accordion'

const CLUSTER_ID = 'Unique ID'
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
            fields: ['orgUnit', 'lastUpdated', 'created', 'attributes'],
        },
    },
}

const Clusters = () => {
    const attributesInfo = []
    const [isOpen, setOpen] = useState(false)

    const { loading, error, data } = useDataQuery(queryClusters)

    if (data) {
        const clusters = data.trackedEntityInstances.trackedEntityInstances
        clusters.map(cluster => {
            const attributesObject = {
                id: '',
                name: '-',
                description: '-',
                type: '-',
                startDate: '-',
                endDate: '-',
                location: null,
            }

            cluster.attributes.map(attr => {
                const { value, displayName } = attr
                if (displayName === CLUSTER_ID) attributesObject.id = value
                if (displayName === CLUSTER_NAME) attributesObject.name = value
                if (displayName === CLUSTER_DESCRIPTION)
                    attributesObject.description = value
                if (displayName === CLUSTER_TYPE) attributesObject.type = value
                if (displayName === CLUSTER_START_DATE)
                    attributesObject.startDate = value
                if (displayName === CLUSTER_END_DATE)
                    attributesObject.endDate = value
                if (displayName === CLUSTER_LOCATION)
                    attributesObject.location = value
            })
            attributesInfo.push(attributesObject)
        })
    }

    const toggleCollapseHandler = (event, id) => {
        const rowId = event.currentTarget.parentNode.parentNode.getAttribute(
            'data-test'
        )
        if (id === rowId) {
            setOpen(prevState => !prevState)
        }
    }

    return (
        <div>
            <Modal>This is a test</Modal>
            {loading && <Spinner />}
            {error && <Modal>{error.message}</Modal>}
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
                        </TableRowHead>
                    </TableHead>
                    <TableBody dataTest="dhis2-uicore-tablebody">
                        {attributesInfo.map(attr => {
                            return (
                                <>
                                    <TableRow
                                        key={attr.id}
                                        data-key={attr.id}
                                        dataTest={attr.id}
                                        toggled
                                    >
                                        <TableCell dataTest="dhis2-uicore-tablecell">
                                            {attr.name}
                                        </TableCell>
                                        <TableCell dataTest="dhis2-uicore-tablecell">
                                            {attr.description}
                                        </TableCell>
                                        <TableCell dataTest="dhis2-uicore-tablecell">
                                            {attr.type}
                                        </TableCell>
                                        <TableCell dataTest="dhis2-uicore-tablecell">
                                            {attr.startDate}
                                        </TableCell>
                                        <TableCell dataTest="dhis2-uicore-tablecell">
                                            {attr.endDate}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={event =>
                                                    toggleCollapseHandler(
                                                        event,
                                                        attr.id
                                                    )
                                                }
                                            >
                                                Toggle
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    {isOpen ? <Accordion /> : null}
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
export default Clusters
