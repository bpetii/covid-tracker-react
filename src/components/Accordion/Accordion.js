import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import ClusterInfo from '../ClusterInfo/ClusterInfo'
import CasesInfo from '../CaseInfo/CaseInfo'
import AccordionModal from './AccordionModal'
import AccordionRow from './AccordionRow'
import stylesAccordion from './Accordion.module.css'
import { extract_relationshps } from './Helpers'
import {
    TableRow,
    TableCell,
    Modal,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui-core'

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
    const [isError, setIsError] = useState(false)

    const cases = []

    const { error, data } = useDataQuery(queryRelationships, {
        variables: {
            id: props.attributes.tei,
        },
    })

    const cssButton = [
        stylesAccordion.accordion,
        isToggled
            ? [stylesAccordion.active].join(' ')
            : stylesAccordion.accordion,
    ]
    let rowStyle = props.index % 2 ? stylesAccordion.zebraStripping : null
    if (isToggled) {
        rowStyle = stylesAccordion.isActive
    }

    const scrollTo = ref => {
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    if (isToggled) {
        if (data) {
            const relationships = extract_relationshps(data)
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
                <AccordionModal handler={openClusterHandler} large={true} attributes={props.attributes}>
                    <ClusterInfo
                        cases={cases}
                        clusterInfo={props.attributes}
                        onOpenBigMap={props.onClickMap}
                    />
                </AccordionModal>
            )}

            {isCasesInfoOpen && (
                <AccordionModal handler={openCasesHandler} show={true} attributes={selectedPerson}>
                    <CasesInfo case={selectedPerson} />
                </AccordionModal>
            )}
            <AccordionRow
                attributes={props.attributes}
                cases={cases}
                openCasesHandler={openCasesHandler}
                openClusterHandler={openClusterHandler}
            />
        </>
    )
    return (
        <>
            {isError && (
                <Modal
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
                            ref={scrollTo}
                            className={cssButton.join(' ')}
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
