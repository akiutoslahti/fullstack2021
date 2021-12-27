import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [, setError] = React.useState<string | undefined>();

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
    if (!patient || !patient.ssn) {
        void fetchPatient(id);
    }

    const getGenderIcon = (patient: Patient | undefined) => {
        if (!patient || patient.gender === "other") {
            return "genderless";
        } else if (patient.gender === "male") {
            return "mars";
        } else {
            return "venus";
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
        </Container>
    );
};

export default PatientPage;
