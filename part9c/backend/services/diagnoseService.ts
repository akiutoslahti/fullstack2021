import diagnoseData from "../data/diagnoses.json";

import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

export default getDiagnoses;
