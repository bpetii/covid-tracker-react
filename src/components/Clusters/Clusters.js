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
    let entityInstances = null
    const { loading, error, data } = useDataQuery(queryClusters)

    if (data) {
        entityInstances = data.trackedEntityInstances.trackedEntityInstances
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
                    {entityInstances.map(tei => {
                        console.log(tei.attributes)
                        return (
                            <TableBody
                                key={Math.random(10)}
                                dataTest="dhis2-uicore-tablebody"
                            >
                                <TableRow dataTest="dhis2-uicore-tablerow">
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

                                    <button> Toggle</button>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            )}
        </div>
    )
}
export default Clusters
