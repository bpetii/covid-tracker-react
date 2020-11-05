import React, { useState, useRef, useEffect } from 'react'

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    Input,
} from '@dhis2/ui-core'
import styles from '../../App.module.css'
import Accordion from '../Accordion/Accordion'

const Clusters = React.memo(props => {
    Clusters.displayName = 'clusters'
    const [userInput, setUserInput] = useState('')
    const [filteredClusters, setFilteredClusters] = useState(props.clusters)
    const inputRef = useRef()

    useEffect(() => {
        if (userInput) {
            setTimeout(() => {
                if (userInput === inputRef.current.inputRef.current.value) {
                    setFilteredClusters(
                        props.clusters.filter(cluster =>
                            cluster.name
                                .toUpperCase()
                                .startsWith(userInput.toUpperCase())
                        )
                    )
                }
            }, 500)
        } else {
            setFilteredClusters(props.clusters)
        }
    }, [userInput])

    return (
        <>
            <Input
                placeholder="Search name"
                onChange={event => setUserInput(event.value)}
                ref={inputRef}
            />
            <Table dataTest="dhis2-uicore-table">
                <TableHead dataTest="dhis2-uicore-tablehead">
                    <TableRowHead
                        dataTest="dhis2-uicore-tablerowhead"
                        className={styles.headingColor}
                    >
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
                        <TableCellHead dataTest="dhis2-uicore-tablecellhead">
                            End
                        </TableCellHead>
                        <TableCellHead dataTest="dhis2-uicore-tablecellhead"></TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody dataTest="dhis2-uicore-tablebody">
                    {filteredClusters.map((attr, index) => {
                        return (
                            <Accordion
                                key={attr.tei}
                                attributes={attr}
                                index={index}
                                onClickMap={props.onOpenMap}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
})
export default Clusters
