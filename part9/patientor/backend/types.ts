export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
    description: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export type Entry =
    | HealthCheckEntry
    | OccupationalHealthCareEntry
    | HospitalEntry;

export type NewEntry =
    | NewHealthCheckEntry
    | NewOccupationalHealthCareEntry
    | NewHospitalEntry;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;

export enum Gender {
    Other = "other",
    Male = "male",
    Female = "female",
}
