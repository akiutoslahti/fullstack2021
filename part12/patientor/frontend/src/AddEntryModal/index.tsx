import React from "react";
import { Modal } from "semantic-ui-react";
import AddEntryForm, { HospitalEntryValues } from "./AddEntryForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryValues) => void;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add new hospital entry</Modal.Header>
        <Modal.Content>
            <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;
