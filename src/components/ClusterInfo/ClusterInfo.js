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
    console.log('ClusterInfo component')

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
                                    key={person.tei}
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
                    <div className={styles.box}>
                        {props.clusterInfo.location.lat ? (
                            <MapComponent
                                clusters={[
                                    {
                                        status: props.clusterInfo.status,
                                        tei: props.clusterInfo.tei,
                                        location: {
                                            lat: props.clusterInfo.location.lat,
                                            lng: props.clusterInfo.location.lng,
                                        },
                                        name: props.clusterInfo.name,
                                        description:
                                            props.clusterInfo.description,
                                        isBig: false,
                                        relationships:
                                            props.clusterInfo.relationships,
                                    },
                                ]}
                            />
                        ) : (
                            <p
                                style={{
                                    position: 'relative',
                                    top: '40%',
                                    left: '30%',
                                }}
                            >
                                No coordiation
                            </p>
                        )}
                    </div>

                    <Button
                        dataTest="dhis2-uicore-button"
                        name="openmap"
                        type="button"
                        value="Open Map"
                        className={styles.openMappButton}
                        onClick={() =>
                            props.onOpenBigMap(
                                props.clusterInfo.location,
                                props.clusterInfo.tei
                            )
                        }
                    >
                        Open Map
                    </Button>
                </section>
            </div>
            <section className={styles.secondContainer}>
                <h1>Information: </h1>
                <hr></hr>
                <label>Cluster Type:</label>
                <p>{props.clusterInfo.type}</p>
                <label>Cluster Description:</label>
                <p>{props.clusterInfo.description}</p>
                <label>Status:</label>
                <p>{props.clusterInfo.status}</p>
                <label>Organiation Unit Name:</label>
                <p>{props.clusterInfo.orgUnitName}</p>
            </section>
        </div>
    )
}

export default ClusterInfo
