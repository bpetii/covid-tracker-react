import React, { useState } from 'react'
import styles from '../../App.module.css'
import { useDataQuery } from '@dhis2/app-runtime'
import Modal from '../UI/Modal/Modal'
import ClusterInfo from '../ClusterInfo/ClusterInfo'
import CasesInfo from '../CaseInfo/CaseInfo'
import Spinner from '../UI/Spinner/Spinner'

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
    const casesArray = []

    if (isToggled) {
        if (data) {
            const relationships = data.relationship
            relationships.map(relationship => {
                const Case = {
                    tei: '',
                    firstName: '-',
                    sureName: '-',
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
                    if (displayName === CASE_SURNAME) Case.sureName = value
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
            <Modal show={isClusterinfoOpen} modalClosed={openClusterHandler}>
                <ClusterInfo
                    cases={casesArray}
                    clusterInfo={props.attributes}
                />
            </Modal>

            <Modal show={isCasesInfoOpen} modalClosed={openCasesHandler}>
                <CasesInfo case={selectedPerson} />
            </Modal>

            <TableRow>
                <TableCell colSpan="6" dataTest="dhis2-uicore-tablecell">
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
                                    <TableCellHead dataTest="dhis2-uicore-tablecellhead"></TableCellHead>
                                </TableRowHead>
                            </TableHead>
                            <TableBody dataTest="dhis2-uicore-tablebody">
                                {casesArray.map(person => {
                                    return (
                                        <TableRow
                                            key={person.id}
                                            suppressZebraStriping
                                            dataTest="dhis2-uicore-tablerow"
                                        >
                                            <TableCell dataTest="dhis2-uicore-tablecell">
                                                {person.tei}
                                            </TableCell>
                                            <TableCell dataTest="dhis2-uicore-tablecell">
                                                {person.firstName}
                                            </TableCell>
                                            <TableCell dataTest="dhis2-uicore-tablecell">
                                                {person.sureName}
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
                </TableCell>
            </TableRow>

            <Button onClick={openClusterHandler}>Show more information</Button>
        </>
    )

    return (
        <>
            {console.log('accordion component')}
            {error && <Modal>{error.message}</Modal>}
            {data && (
                <TableRow>
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
