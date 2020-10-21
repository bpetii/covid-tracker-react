import React, { useState } from 'react'
import styles from '../../App.module.css'
import { useDataQuery } from '@dhis2/app-runtime'
import ClusterInfo from '../ClusterInfo/ClusterInfo'
import CasesInfo from '../CaseInfo/CaseInfo'
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
    Modal,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui-core'
const CASE_FIRSTNAME = 'First Name'
const CASE_SURNAME = 'Surname'
const CASE_AGE = 'Age'
const CASE_SEX = 'Sex'
const CASE_COUNTRY = 'Country of birth'
const CASE_NUMBERID = 'National ID number'
const CASE_BIRTHDATE = 'Date of birth'

const queryRelationships = {
    relationship: {
        resource: 'relationships',
        params: ({ id }) => ({
            tei: id,
        }),
    },
}

const accordion = React.memo(props => {
    const [isToggled, setToggle] = useState(false)
    const [isClusterinfoOpen, setClusterInfo] = useState(false)
    const [isCasesInfoOpen, setCasesInfo] = useState(false)
    const [selectedPerson, setSelectedPerson] = useState(null)

    const { error, data } = useDataQuery(queryRelationships, {
        variables: {
            id: props.attributes.tei,
        },
    })

    let rowStyle = props.index % 2 ? styles.zebraStripping : null
    if (isToggled) {
        rowStyle = styles.isActive
    }

    const casesArray = []

    if (isToggled) {
        if (data) {
            const relationships = data.relationship
            relationships.map(relationship => {
                const Case = {
                    tei: '',
                    firstName: '-',
                    surName: '-',
                    sex: '-',
                    numberId: '-',
                    country: '-',
                    age: '-',
                    birthDate: '-',
                }
                Case.tei =
                    relationship.from.trackedEntityInstance.trackedEntityInstance
                relationship.from.trackedEntityInstance.attributes.map(attr => {
                    const { value, displayName } = attr
                    if (displayName === CASE_FIRSTNAME) Case.firstName = value
                    if (displayName === CASE_SURNAME) Case.surName = value
                    if (displayName === CASE_SEX) Case.sex = value
                    if (displayName === CASE_AGE) Case.age = value
                    if (displayName === CASE_COUNTRY) Case.country = value
                    if (displayName === CASE_NUMBERID) Case.numberId = value
                    if (displayName === CASE_BIRTHDATE) Case.birthDate = value
                })
                casesArray.push(Case)
            })
        }
    }

    const toggleRowHandler = () => {
        setToggle(prevState => !prevState)
    }

    const openClusterHandler = () => {
        setClusterInfo(prevState => !prevState)
    }

    const openCasesHandler = person => {
        setSelectedPerson(person)
        setCasesInfo(prevState => !prevState)
    }

    const toggledRow = (
        <>
            {isClusterinfoOpen && (
                <Modal
                    className={styles.Modal}
                    dataTest="dhis2-uicore-modal"
                    show={isClusterinfoOpen}
                    onClose={openClusterHandler}
                    position="middle"
                    large
                >
                    <ModalTitle dataTest="dhis2-uicore-modaltitle">
                        <div style={{ display: 'inline', fontSize: '0.em' }}>
                            <h1 style={{ float: 'left' }}>
                                {props.attributes.name}
                            </h1>
                            <h1 style={{ float: 'right' }}>
                                Cases: {props.attributes.relationships}
                            </h1>
                        </div>
                    </ModalTitle>

                    <ModalContent>
                        <ClusterInfo
                            cases={casesArray}
                            clusterInfo={props.attributes}
                            onOpenMap={() =>
                                props.onClickMap(props.attributes.location)
                            }
                        />
                    </ModalContent>
                </Modal>
            )}

            {isCasesInfoOpen && (
                <Modal
                    className={styles.Modal}
                    dataTest="dhis2-uicore-modal"
                    show={isCasesInfoOpen}
                    onClose={openCasesHandler}
                    position="middle"
                >
                    <ModalContent>
                        <CasesInfo case={selectedPerson} />
                    </ModalContent>
                </Modal>
            )}

            <TableRow>
                <TableCell colSpan="6" dataTest="dhis2-uicore-tablecell">
                    <div className={stylesAccordion.container}>
                        <h2>Details:</h2>
                        <br />
                        <Table
                            dataTest="dhis2-uicore-table"
                            className={stylesAccordion.table}
                        >
                            <TableHead dataTest="dhis2-uicore-tablehead">
                                <TableRowHead dataTest="dhis2-uicore-tablerowhead">
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                        ID
                                    </TableCellHead>
                                    <TableCellHead
                                        dataTest="dhis2-uicore-tablecellhead"
                                        width="20px"
                                    >
                                        Firstname
                                    </TableCellHead>
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                                        Lastname
                                    </TableCellHead>
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead"></TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody dataTest="dhis2-uicore-tablebody">
                                {casesArray.slice(0, 5).map(person => {
                                    return (
                                        <TableRow
                                            key={person.id}
                                            dataTest="dhis2-uicore-tablerow"
                                        >
                                            <TableCell dataTest="dhis2-uicore-tablecell">
                                                {person.tei}
                                            </TableCell>
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
                        <section>
                            <div className={stylesAccordion.box}>
                                {props.attributes.location.lat ? (
                                    <MapComponent
                                        clusters={[
                                            {
                                                location: {
                                                    lat:
                                                        props.attributes
                                                            .location.lat,
                                                    lng:
                                                        props.attributes
                                                            .location.lng,
                                                },
                                                name: props.attributes.name,
                                                description:
                                                    props.attributes
                                                        .description,
                                                isBig: false,
                                                relationships:
                                                    props.attributes
                                                        .relationships,
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
                        </section>
                        <Button
                            onClick={openClusterHandler}
                            className={stylesAccordion.table}
                        >
                            Show more information
                        </Button>
                        <section>
                            <Button
                                dataTest="dhis2-uicore-button"
                                name="openmap"
                                type="button"
                                value="Open Map"
                                className={stylesAccordion.openMappButton}
                                onClick={() =>
                                    props.onClickMap(
                                        props.attributes.location,
                                        props.attributes.tei
                                    )
                                }
                            >
                                Open Map
                            </Button>
                        </section>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
    return (
        <>
            {error && <Modal>{error.message}</Modal>}
            {data && (
                <TableRow suppressZebraStriping className={rowStyle}>
                    <TableCell dataTest="dhis2-uicore-tablecell">
                        {props.attributes.name}
                    </TableCell>
                    <TableCell dataTest="dhis2-uicore-tablecell">
                        {props.attributes.description}
                    </TableCell>
                    <TableCell dataTest="dhis2-uicore-tablecell">
                        {props.attributes.type}
                    </TableCell>
                    <TableCell dataTest="dhis2-uicore-tablecell">
                        {props.attributes.startDate}
                    </TableCell>
                    <TableCell dataTest="dhis2-uicore-tablecell">
                        {props.attributes.endDate}
                    </TableCell>
                    <TableCell>
                        <button
                            className={
                                isToggled
                                    ? [styles.accordion, styles.active].join(
                                          ' '
                                      )
                                    : styles.accordion
                            }
                            onClick={() => toggleRowHandler(casesArray)}
                        ></button>
                    </TableCell>
                </TableRow>
            )}

            {isToggled ? toggledRow : null}
        </>
    )
})

export default accordion
