import React from 'react'
import styles from './CaseInfo.module.css'

const CaseInfo = props => {
    return (
        props.case && (
            <section className={styles.container2}>
                {console.log('casesInfo component')}
                <h1>{props.case.firstName}</h1>
                <h1>{props.case.sureName}</h1>

                <label>First Name</label>
                <p>{props.case.firstName}</p>
                <label>Last Name:</label>
                <p>{props.case.sureName}</p>
                <label>Date of Birth:</label>
                <p>{props.case.birthDate}</p>
                <label>Age:</label>
                <p>{props.case.age}</p>
                <label>Sex:</label>
                <p>{props.case.sex}</p>
                <label>National ID number:</label>
                <p>{props.case.numberId}</p>
                <label>Country of birth:</label>
                <p>{props.case.country}</p>
            </section>
        )
    )
}

export default CaseInfo
