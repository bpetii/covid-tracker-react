import React from 'react'
import { Button, Modal, ModalContent, ModalTitle } from '@dhis2/ui-core'
const AccordionModal = props => {
    let large = false
    let small = false
    let show = false
    if (props && props.large) {
        large = true
    }
    if (props && props.small) {
        small = true
    }
    if (props && props.show) {
        show = true
    }

    console.log(props.attributes)
    return (
        <Modal
            dataTest="dhis2-uicore-modal"
            onClose={props.handler}
            position="middle"
            large={large}
            small={small}
            show={show}
        >
            <ModalTitle dataTest="dhis2-uicore-modaltitle">
                <div>
                    <Button onClick={props.handler}>Back</Button>
                </div>

                <div style={{ display: 'inline' }}>
                    <h1 style={{ float: 'left' }}>{props.attributes.name}</h1>
                    {props.attributes.type && (
                        <h1 style={{ float: 'right' }}>
                            Cases: {props.attributes.relationships}
                        </h1>
                    )}
                </div>
            </ModalTitle>

            <ModalContent>{props.children}</ModalContent>
        </Modal>
    )
}
export default AccordionModal
