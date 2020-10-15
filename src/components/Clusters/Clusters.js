import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import Spinner from '../Spinner/Spinner'
import Modal from '../Modal/Modal'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
} from '@dhis2/ui-core'

import Collapse from '../Collapse/Collapse'
import Backdrop from '../Backdrop/Backdrop'

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

    const toggleCollapseHandler = e => {
        setOpen(prevState => !prevState)
    }

    return (
        <div>
            <Modal show={isOpen} modalClosed={toggleCollapseHandler}>
                This is a test
            </Modal>
            {loading && <Spinner />}
            {error && <span>{`ERROR: ${error.message}`}</span>}
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
                                        suppressZebraStriping
                                        key={attr.id}
                                        dataTest="dhis2-uicore-tablerow"
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
                                            <button
                                                onClick={e =>
                                                    toggleCollapseHandler(e)
                                                }
                                            >
                                                Toggle
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                    {/*  <TableRow>
                                        <TableCell
                                            colSpan="5"
                                            dataTest="dhis2-uicore-tablecell"
                                        >
                                            <Collapse
                                                isOpen={isOpen}
                                            ></Collapse>
                                        </TableCell>
                                    </TableRow> */}
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
