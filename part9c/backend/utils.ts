import { NewPatientEntry, Gender } from "./types";

const isString = (param: unknown): param is string => {
    return typeof param === "string" || param instanceof String;
};

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error("Malformatted of missing string.");
    }
    return str;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
    };
    return newEntry;
};

export default toNewPatientEntry;
