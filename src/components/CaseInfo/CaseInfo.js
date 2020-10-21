import React from 'react'
import styles from './CaseInfo.module.css'
import { CenteredContent } from '@dhis2/ui'

const CaseInfo = props => {
    return (
        props.case && (
            <>
                <CenteredContent
                    dataTest="dhis2-uicore-centeredcontent"
                    position="top"
                >
                    <h1 className={styles.fullName}>
                        {props.case.firstName} {props.case.sureName}
                    </h1>
                </CenteredContent>
                <section className={styles.container}>
                    {console.log('casesInfo component')}

                    <label>First Name:</label>
                    <p>{props.case.firstName}</p>
                    <label>Last Name:</label>
                    <p>{props.case.sureName}</p>
                    <label>Date of Birth:</label>
                    <p>{props.case.birthDate}</p>
                    <label>Age:</label>
                    <p>{props.case.age} </p>
                    <label>Sex:</label>
                    <p>{props.case.sex}</p>
                    <label>National ID number:</label>
                    <p>{props.case.numberId}</p>
                    <label>Country of birth:</label>
                    <p>{props.case.country}</p>
                </section>
            </>
        )
    )
}

export default CaseInfo
