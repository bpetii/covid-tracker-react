const CASE_FIRSTNAME = 'First Name'
const CASE_SURNAME = 'Surname'
const CASE_AGE = 'Age'
const CASE_SEX = 'Sex'
const CASE_COUNTRY = 'Country of birth'
const CASE_NUMBERID = 'National ID number'
const CASE_BIRTHDATE = 'Date of birth'

export const extract_relationshps = data => {
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
            if (displayName === CASE_FIRSTNAME) caseObject.firstName = value
            if (displayName === CASE_SURNAME) caseObject.surName = value
            if (displayName === CASE_SEX) caseObject.sex = value
            if (displayName === CASE_AGE) caseObject.age = value
            if (displayName === CASE_COUNTRY) caseObject.country = value
            if (displayName === CASE_NUMBERID) caseObject.numberId = value
            if (displayName === CASE_BIRTHDATE) caseObject.birthDate = value
        })
        return caseObject
    })
    return relationships
}
