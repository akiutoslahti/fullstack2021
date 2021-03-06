import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from "../types";
import { toNewPatient } from "../utils";

const patients: Array<Patient> = patientData.map((obj) => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPublicPatients = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find((p) => p.id === id);
    return patient;
};

const addPatient = (entry: NewPatient): PublicPatient => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry,
    };
    patients.push(newEntry);
    return {
        id: newEntry.id,
        name: newEntry.name,
        dateOfBirth: newEntry.dateOfBirth,
        gender: newEntry.gender,
        occupation: newEntry.occupation,
    };
};

const addPatientEntry = (id: string, entry: NewEntry): Entry => {
    const patient = getPatientById(id);
    const newId = uuid();
    const newEntry: Entry = {
        id: newId,
        ...entry,
    };
    patient?.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    getPublicPatients,
    addPatient,
    getPatientById,
    addPatientEntry,
};
