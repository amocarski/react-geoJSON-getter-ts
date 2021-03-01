import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { FC } from "react";
import ReactJson from "react-json-view";

interface DataModalProps {
    isOpen: boolean,
    onClose: () => void,
    content: Object
}

const DataModal: FC<DataModalProps> = (props: DataModalProps) => {
    const { isOpen, onClose, content } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader data-testid="modal-title">GeoJSON object</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ReactJson src={content} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default DataModal;