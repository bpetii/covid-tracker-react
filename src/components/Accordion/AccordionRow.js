import React from 'react'
import styles from '../../App.module.css'
import MapComponent from '../Map'
import stylesAccordion from './Accordion.module.css'
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

const AccordionRow = ({
    attributes,
    cases,
    openCasesHandler,
    openClusterHandler,
}) => {
    return (
        <TableRow>
            <TableCell
                suppressZebraStriping
                colSpan="6"
                dataTest="dhis2-uicore-tablecell"
                className={stylesAccordion.highlightBorder}
            >
                <div className={stylesAccordion.container}>
                    <div className={stylesAccordion.tableDetails}>
                        <Table dataTest="dhis2-uicore-table">
                            <TableHead dataTest="dhis2-uicore-tablehead">
                                <TableRowHead
                                    className={styles.headingColor}
                                    dataTest="dhis2-uicore-tablerowhead"
                                >
                                    <TableCellHead
                                        dataTest="dhis2-uicore-tablecellhead"
                                        width="20px"
                                    >
                                        Firstname
                                    </TableCellHead>
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                        Lastname
                                    </TableCellHead>
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                        Details
                                    </TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody dataTest="dhis2-uicore-tablebody">
                                {cases.map(person => {
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
                                                <Button
                                                    onClick={() =>
                                                        openCasesHandler(person)
                                                    }
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <div className={stylesAccordion.box}>
                        {attributes.location.lat ? (
                            <MapComponent
                                clusters={[
                                    {
                                        status: attributes.status,
                                        tei: attributes.tei,
                                        location: {
                                            lat: attributes.location.lat,
                                            lng: attributes.location.lng,
                                        },

                                        name: attributes.name,

                                        description: attributes.description,
                                        isBig: false,
                                        relationships: attributes.relationships,
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
                                No coordinates
                            </p>
                        )}
                    </div>
                </div>
                <section
                    className={`${stylesAccordion.sectionContainer} ${stylesAccordion.sectionBtn}`}
                >
                    <Button
                        onClick={openClusterHandler}
                        className={stylesAccordion.showMoreInformationBtn}
                    >
                        Show more information about this cluster
                    </Button>
                </section>
            </TableCell>
        </TableRow>
    )
}
export default AccordionRow
