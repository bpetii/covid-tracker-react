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

const Clusters = props => {
    const [userInput, setUserInput] = useState('')
    const [filteredClusters, setFilteredClusters] = useState([])
    const inputRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            if (userInput === inputRef.current.inputRef.current.value) {
                setFilteredClusters(
                    props.clusters.filter(cluster =>
                        cluster.name
                            .toUpperCase()
                            .startsWith(userInput.toUpperCase())
                    )
                )
            } else {
                setFilteredClusters(props.clusters)
            }
        }, 500)
    }, [userInput, props.clusters])

    return (
        <div>
            {console.log('Clusters component')}

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
        </div>
    )
}
export default Clusters
