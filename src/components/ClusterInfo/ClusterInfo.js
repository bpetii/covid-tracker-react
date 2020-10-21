import React from 'react'
import styles from './ClusterInfo.module.css'
import MapComponent from '../Map'

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

const ClusterInfo = props => {
    console.log('clusterInfo component')
    const formattedLocation = props.clusterInfo.location
        .replace(/[^0-9 |.|,]/g, '')
        .split(',')
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
                        {props.cases.map(person => {
                            return (
                                <TableRow
                                    key={person.surName}
                                    dataTest="dhis2-uicore-tablerow"
                                >
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {person.firstName}
                                    </TableCell>
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {person.surName}
                                    </TableCell>
                                    <TableCell dataTest="dhis2-uicore-tablecell">
                                        {person.age}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <section>
                    {console.log()}

                    <div className={styles.box}>
                        <MapComponent
                            location={{
                                lat: formattedLocation[1],
                                lng: formattedLocation[0],
                            }}
                            name={props.clusterInfo.name}
                            isBig={false}
                        />
                    </div>

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
                <p>{props.clusterInfo.type}</p>
                <label>Cluster Description:</label>
                <p>{props.clusterInfo.description}</p>
            </section>
        </div>
    )
}

export default ClusterInfo
