import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
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
    const [isOpen, setOpen] = useState(false)

    let entityInstances = null
    const { loading, error, data } = useDataQuery(queryClusters)

    if (data) {
        entityInstances = data.trackedEntityInstances.trackedEntityInstances
    }

    const toggleCollapseHandler = e => {
        setOpen(prevState => !prevState)
    }

    return (
        <div>
            {loading && <span>...</span>}
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
                        </TableRowHead>
                    </TableHead>
                    <TableBody dataTest="dhis2-uicore-tablebody">
                        {entityInstances.map(tei => {
                            return (
                                <TableRow
                                    key={
                                        tei.attributes[
                                            tei.attributes.findIndex(attr => {
                                                return (
                                                    attr.displayName ===
                                                    'Unique ID'
                                                )
                                            })
                                        ].value
                                    }
                                    dataTest="dhis2-uicore-tablerow"
                                >
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {
                                            tei.attributes[
                                                tei.attributes.findIndex(
                                                    attr => {
                                                        return (
                                                            attr.displayName ===
                                                            'Cluster name'
                                                        )
                                                    }
                                                )
                                            ].value
                                        }
                                    </TableCell>
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {
                                            tei.attributes[
                                                tei.attributes.findIndex(
                                                    attr => {
                                                        return (
                                                            attr.displayName ===
                                                            'Cluster description'
                                                        )
                                                    }
                                                )
                                            ].value
                                        }
                                    </TableCell>
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {tei.attributes[
                                            tei.attributes.findIndex(attr => {
                                                return (
                                                    attr.displayName ===
                                                    'Cluster type'
                                                )
                                            })
                                        ]
                                            ? tei.attributes[
                                                  tei.attributes.findIndex(
                                                      attr => {
                                                          return (
                                                              attr.displayName ===
                                                              'Cluster type'
                                                          )
                                                      }
                                                  )
                                              ].value
                                            : '-'}
                                    </TableCell>
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {
                                            tei.attributes[
                                                tei.attributes.findIndex(
                                                    attr => {
                                                        return (
                                                            attr.displayName ===
                                                            'Cluster - Start date and time of cluster'
                                                        )
                                                    }
                                                )
                                            ].value
                                        }
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
                            )
                        })}
                    </TableBody>
                </Table>
            )}
            <Collapse isOpen={isOpen} ></Collapse>
        </div>
    )
}
export default Clusters
