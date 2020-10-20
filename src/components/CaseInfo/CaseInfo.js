import React from 'react'
import styles from './CaseInfo.module.css'
import { CenteredContent } from '@dhis2/ui'

const CaseInfo = props => {
    return (
        props.case && (
<<<<<<< Updated upstream
            <section className={styles.container2}>
                {console.log('casesInfo component')}
                <h1>{props.case.firstName}</h1>
                <h1>{props.case.sureName}</h1>
=======
            <>
                <CenteredContent
                    dataTest="dhis2-uicore-centeredcontent"
                    position="top"
                >
                    <h1>
                        {props.case.firstName} {props.case.sureName}
                    </h1>
                </CenteredContent>
                <section className={styles.container}>
                    {console.log('casesInfo component')}
>>>>>>> Stashed changes

                    <label>First Name:</label>
                    <input onChange={() => {}} value={props.case.firstName} />
                    <label>Last Name:</label>
                    <input onChange={() => {}} value={props.case.sureName} />
                    <label>Date of Birth:</label>
                    <input onChange={() => {}} value={props.case.birthDate} />
                    <label>Age:</label>
                    <input onChange={() => {}} value={props.case.age} />
                    <label>Sex:</label>
                    <input onChange={() => {}} value={props.case.sex} />
                    <label>National ID number:</label>
                    <input onChange={() => {}} value={props.case.numberId} />
                    <label>Country of birth:</label>
                    <input onChange={() => {}} value={props.case.country} />
                </section>
            </>
        )
    )
}

export default CaseInfo
