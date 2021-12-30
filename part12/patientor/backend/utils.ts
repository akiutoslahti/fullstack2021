import {
    NewPatient,
    Gender,
    Entry,
    NewHealthCheckEntry,
    NewEntry,
    NewHospitalEntry,
    NewOccupationalHealthCareEntry,
    HealthCheckRating,
} from "./types";

const isString = (param: unknown): param is string => {
    return typeof param === "string" || param instanceof String;
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error("Malformatted of missing string.");
    }
    return str;
};

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

const parseDate = (date: unknown): string => {
    const datestr = parseString(date);
    if (!isDate(datestr)) {
        throw new Error("Malformatted date.");
    }
    return datestr;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Malformatted gender.");
    }
    return gender;
};

const parseEntries = (entries: unknown): Array<Entry> => {
    if (!entries || !(entries instanceof Array)) {
        return [];
    }

    return entries as Array<Entry>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: parseEntries(object.entries),
    };
    return newEntry;
};

const isStringArray = (param: unknown): param is Array<string> => {
    if (!param || !(param instanceof Array)) {
        return false;
    }
    return param.filter((elem) => !isString(elem)).length === 0;
};

const parseDiagnosisCodes = (param: unknown): Array<string> => {
    if (!param) {
        return [];
    }

    if (!isStringArray(param)) {
        throw new Error("Malformatted diagnosis codes");
    }

    return param;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error("Malformatted health check rating.");
    }
    return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
    const newEntry: NewHealthCheckEntry = {
        type: "HealthCheck",
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        description: parseString(object.description),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewHospitalEntry = (object: any): NewHospitalEntry => {
    const newEntry: NewHospitalEntry = {
        type: "Hospital",
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        description: parseString(object.description),
        discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseString(object.discharge.criteria),
        },
    };
    return newEntry;
};

const parseSickLeave = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any
): { startDate: string; endDate: string } | undefined => {
    if (!object) {
        return undefined;
    }
    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
    };
};

const toNewOccupationalHealthCareEntry = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any
): NewOccupationalHealthCareEntry => {
    const newEntry: NewOccupationalHealthCareEntry = {
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        description: parseString(object.description),
        sickLeave: parseSickLeave(object.sickleave),
    };
    return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
    if (!object.type || !isString(object.type)) {
        throw new Error("Malformatted type.");
    }
    switch (object.type) {
        case "HealthCheck":
            return toNewHealthCheckEntry(object);
        case "OccupationalHealthcare":
            return toNewOccupationalHealthCareEntry(object);
        case "Hospital":
            return toNewHospitalEntry(object);
        default:
            throw new Error("Unknown type.");
    }
};
