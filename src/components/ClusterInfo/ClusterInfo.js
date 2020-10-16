import React, { useState } from 'react'
import styles from './ClusterInfo.module.css'

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

const ClusterInfo = () => {
    return (
        <div>
            <div className={styles.container}>
                <Table dataTest="dhis2-uicore-table" className={styles.table}>
                    <TableHead dataTest="dhis2-uicore-tablehead">
                        <TableRowHead dataTest="dhis2-uicore-tablerowhead">
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                First Name
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Surname
                            </TableCellHead>
                            <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                Age
                            </TableCellHead>
                        </TableRowHead>
                    </TableHead>
                    <TableBody dataTest="dhis2-uicore-tablebody">
                        <TableRow dataTest="dhis2-uicore-tablerow">
                            <TableCell dataTest="dhis2-uicore-tablecell">
                                firstname
                            </TableCell>
                            <TableCell dataTest="dhis2-uicore-tablecell">
                                surname
                            </TableCell>
                            <TableCell dataTest="dhis2-uicore-tablecell">
                                age
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <section>
                    <div className={styles.box}></div>

                    <Button
                        dataTest="dhis2-uicore-button"
                        name="openmap"
                        type="button"
                        value="Open Map"
                        className={styles.openMappButton}
                    >
                        Open Map
                    </Button>
                </section>
            </div>
            <section className={styles.container2}>
                <h1>Description: </h1>
                <hr></hr>
                <label>Cluster Type:</label>
                <p>Put the cluster type here</p>
                <label>Cluster Description:</label>
                <p>Put the description here</p>
            </section>
        </div>
    )
}

export default ClusterInfo
