import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Container,
    Header,
    Icon,
    List,
    Segment,
} from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { HospitalEntryValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { addPatient, addPatientEntry, useStateValue } from "../state";
import {
    Entry,
    HealthCheckEntry,
    HealthCheckRating,
    HospitalEntry,
    OccupationalHealthCareEntry,
    Patient,
} from "../types";

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [, setError] = React.useState<string | undefined>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => setModalOpen(false);

    const fetchPatient = async (id: string) => {
        try {
            const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatient(patientFromApi));
        } catch (e) {
            console.error(e.response?.data || "Unknown Error");
            setError(e.response?.data?.error || "Unknown error");
        }
    };

    const patient = Object.values(patients).find((p) => p.id === id);
    if (!patient || !patient.ssn || !patient.entries) {
        void fetchPatient(id);
    }

    const HealthCheckSymbol = ({ rating }: { rating: HealthCheckRating }) => {
        switch (rating) {
            case 0:
                return <Icon name="heart" color="green"></Icon>;
            case 1:
                return <Icon name="heart" color="yellow"></Icon>;
            case 2:
                return <Icon name="heart" color="orange"></Icon>;
            case 3:
                return <Icon name="heart" color="red"></Icon>;
            default:
                return <Icon name="heart" color="black"></Icon>;
        }
    };

    const DiagnosisList = ({ codes }: { codes: Array<string> | undefined }) => {
        if (!codes) return <div></div>;

        const diagnosisList = codes.map((diagnosis, idx) => (
            <List.Item key={idx}>
                {diagnosis} {diagnoses[diagnosis]?.name}
            </List.Item>
        ));
        return <List>{diagnosisList}</List>;
    };

    const HealthCheckEntryDetails = ({
        entry,
    }: {
        entry: HealthCheckEntry;
    }) => {
        return (
            <Segment>
                <div>
                    <b>{entry.date}</b>{" "}
                    <Icon size="big" name="user doctor"></Icon>
                </div>
                <div>
                    <i>{entry.description}</i>
                </div>
                <HealthCheckSymbol rating={entry.healthCheckRating} />
                <DiagnosisList codes={entry.diagnosisCodes} />
            </Segment>
        );
    };

    const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
        return (
            <Segment>
                <div>
                    <b>{entry.date}</b> <Icon size="big" name="hospital"></Icon>
                </div>
                <div>
                    <i>{entry.description}</i>
                </div>
                <DiagnosisList codes={entry.diagnosisCodes} />
            </Segment>
        );
    };

    const OccupationalHealthCareEntryDetails = ({
        entry,
    }: {
        entry: OccupationalHealthCareEntry;
    }) => {
        return (
            <Segment>
                <div>
                    <b>{entry.date}</b>{" "}
                    <Icon size="big" name="stethoscope">
                        {entry.employerName}
                    </Icon>
                </div>
                <div>
                    <i>{entry.description}</i>
                </div>
                <DiagnosisList codes={entry.diagnosisCodes} />
            </Segment>
        );
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        const assertNever = (value: never): never => {
            throw new Error(
                `Unhandled discriminated union member: ${JSON.stringify(value)}`
            );
        };
        switch (entry.type) {
            case "HealthCheck":
                return <HealthCheckEntryDetails entry={entry} />;
            case "Hospital":
                return <HospitalEntryDetails entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthCareEntryDetails entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    const Entries = ({ entries }: { entries: Array<Entry> | undefined }) => {
        if (!entries) {
            return <div></div>;
        }
        return (
            <div>
                {entries.map((entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </div>
        );
    };

    const getGenderIcon = (patient: Patient | undefined) => {
        if (!patient || patient.gender === "other") {
            return "genderless";
        } else if (patient.gender === "male") {
            return "mars";
        } else {
            return "venus";
        }
    };

    const submitNewEntry = async (values: HospitalEntryValues) => {
        try {
            const { data: newEntry } = await axios.post<HospitalEntry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            if (patient)
                dispatch(addPatientEntry(patient, newEntry));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || "Unknown Error");
            setError(e.response?.data?.error || "Unknown error");
        }
    };

    return (
        <Container>
            <Header as="h3">
                {patient?.name}{" "}
                <Icon fitted name={getGenderIcon(patient)}></Icon>
            </Header>
            <div>ssn: {patient?.ssn}</div>
            <div>occupation: {patient?.occupation}</div>
            <Header as="h4">entries</Header>
            <Entries entries={patient?.entries} />
            <AddEntryModal
                modalOpen={modalOpen}
                onClose={closeModal}
                onSubmit={submitNewEntry}
            />
            <br></br>
            <Button onClick={() => openModal()}>Add new hospital entry</Button>
        </Container>
    );
};

export default PatientPage;
