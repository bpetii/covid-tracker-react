import React from 'react'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
} from '@dhis2/ui-core'

const Clusters = () => {
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
                    </TableRowHead>
                </TableHead>
                <TableBody dataTest="dhis2-uicore-tablebody">
                    <TableRow dataTest="dhis2-uicore-tablerow">
                        <TableCell dataTest="dhis2-uicore-tablecell">
                            some name
                        </TableCell>
                        <TableCell dataTest={`details-name`}>
                            some description
                        </TableCell>
                        <TableCell dataTest={`details-name`}>
                            some type
                        </TableCell>
                        <TableCell dataTest={`details-name`}>
                            some start
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
export default Clusters
