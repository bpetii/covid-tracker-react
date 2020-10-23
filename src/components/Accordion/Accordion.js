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
    console.log('Accordion component')
    const [isToggled, setToggle] = useState(false)
    const [isClusterinfoOpen, setClusterInfo] = useState(false)
    const [isCasesInfoOpen, setCasesInfo] = useState(false)
    const [selectedPerson, setSelectedPerson] = useState(null)
    const [isError, setIsError] = useState(false)
    const cases = []

    const { error, data } = useDataQuery(queryRelationships, {
        variables: {
            id: props.attributes.tei,
        },
    })

    let rowStyle = props.index % 2 ? styles.zebraStripping : null
    if (isToggled) {
        rowStyle = styles.isActive
    }

    if (isToggled) {
        if (data) {
            const relationships = data.relationship.map(relationship => {
                const caseObject = {
                    tei: '',
                    firstName: '-',
                    surName: '-',
                    sex: '-',
                    numberId: '-',
                    country: '-',
                    age: '-',
                    birthDate: '-',
                }
                caseObject.tei =
                    relationship.from.trackedEntityInstance.trackedEntityInstance

                relationship.from.trackedEntityInstance.attributes.map(attr => {
                    const { value, displayName } = attr
                    if (displayName === CASE_FIRSTNAME)
                        caseObject.firstName = value
                    if (displayName === CASE_SURNAME) caseObject.surName = value
                    if (displayName === CASE_SEX) caseObject.sex = value
                    if (displayName === CASE_AGE) caseObject.age = value
                    if (displayName === CASE_COUNTRY) caseObject.country = value
                    if (displayName === CASE_NUMBERID)
                        caseObject.numberId = value
                    if (displayName === CASE_BIRTHDATE)
                        caseObject.birthDate = value
                })
                return caseObject
            })
            cases.push(...relationships)
        } else if (error) {
            setIsError(true)
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

    const clearError = () => {
        setIsError(false)
    }

    const toggledRow = (
        <>
            {isClusterinfoOpen && (
                <Modal
                    className={
                        isClusterinfoOpen
                            ? stylesAccordion.ModalOpen
                            : stylesAccordion.ModalClosed
                    }
                    dataTest="dhis2-uicore-modal"
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
                            cases={cases}
                            clusterInfo={props.attributes}
                            onOpenBigMap={props.onClickMap}
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
                                                            openCasesHandler(
                                                                person
                                                            )
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

                        <section className={stylesAccordion.sectionContainer}>
                            <div className={stylesAccordion.box}>
                                {props.attributes.location.lat ? (
                                    <MapComponent
                                        clusters={[
                                            {
                                                status: props.attributes.status,
                                                tei: props.attributes.tei,
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
                        <section
                            className={`${stylesAccordion.sectionContainer} ${stylesAccordion.sectionBtn}`}
                        >
                            <Button
                                onClick={openClusterHandler}
                                className={stylesAccordion.openMappButton}
                            >
                                Show more information
                            </Button>
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
            {isError && (
                <Modal
                    className={styles.Modal}
                    dataTest="dhis2-uicore-modal"
                    show={isError}
                    onClose={clearError}
                    position="middle"
                    small
                >
                    <ModalTitle dataTest="dhis2-uicore-modaltitle">
                        {error.type}
                    </ModalTitle>
                    <ModalContent>{error.message}</ModalContent>
                </Modal>
            )}
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
                            onClick={() => toggleRowHandler(cases)}
                        ></button>
                    </TableCell>
                </TableRow>
            )}

            {isToggled ? toggledRow : null}
        </>
    )
})

export default accordion
