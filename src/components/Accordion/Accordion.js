import React from 'react'
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

const accordion = props => (
    <>
        <TableRow>
            <TableCell colSpan="5" dataTest="dhis2-uicore-tablecell">
                <div>
                    <h2>Details:</h2>
                    <Table dataTest="dhis2-uicore-table">
                        <TableHead dataTest="dhis2-uicore-tablehead">
                            <TableRowHead dataTest="dhis2-uicore-tablerowhead">
                                <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                    ID
                                </TableCellHead>
                                <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                    Firstname
                                </TableCellHead>
                                <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                    Lastname
                                </TableCellHead>
                            </TableRowHead>
                        </TableHead>
                        <TableBody dataTest="dhis2-uicore-tablebody">
                            <TableRow
                                suppressZebraStriping
                                dataTest="dhis2-uicore-tablerow"
                            >
                                <TableCell dataTest="dhis2-uicore-tablecell">
                                    4.1
                                </TableCell>
                                <TableCell dataTest="dhis2-uicore-tablecell">
                                    Peter
                                </TableCell>
                                <TableCell dataTest="dhis2-uicore-tablecell">
                                    Biro
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </TableCell>
        </TableRow>
        <Button>Show more information</Button>
    </>
)

export default accordion
