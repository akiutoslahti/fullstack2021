import patientData from "../data/patients.json";
import { v1 as uuid } from "uuid";

import {
    PatientEntry,
    NonSensitivePatientEntry,
    NewPatientEntry,
} from "../types";

const patients: Array<PatientEntry> = patientData;

const getPatients = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry,
    };
    patientData.push(newEntry);
    return {
        id: newEntry.id,
        name: newEntry.name,
        dateOfBirth: newEntry.dateOfBirth,
        gender: newEntry.gender,
        occupation: newEntry.occupation,
    };
};

export default { getPatients, getNonSensitivePatients, addPatient };
