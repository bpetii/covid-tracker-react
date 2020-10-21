import React, { useState } from 'react'

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
} from '@dhis2/ui-core'

import Accordion from '../Accordion/Accordion'

const Clusters = props => {
    return (
        <div>
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
                    {props.clusters.map((attr, index) => {
                        return (
                            <Accordion
                                key={attr.tei}
                                attributes={attr}
                                index={index}
                                onClickMap={props.onOpenMap}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
export default Clusters
