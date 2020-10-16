import React from 'react'
import styles from './CaseInfo.module.css'

const CaseInfo = () => {
    return (
        <section className={styles.container2}>
            <h1>firstname here</h1>
            <h1>lastname here</h1>

            <label>First Name</label>
            <p>Put the First Name here</p>
            <label>Last Name:</label>
            <p>Put the Last Name here</p>
            <label>Date of Birth:</label>
            <p>Put the Date of Birth here</p>
            <label>Age:</label>
            <p>Put the Age here</p>
            <label>Sex:</label>
            <p>Put the Sex here</p>
            <label>National ID number:</label>
            <p>Put the National ID number here</p>
            <label>Country of birth:</label>
            <p>Put the Country of birth here</p>
        </section>
    )
}

export default CaseInfo
