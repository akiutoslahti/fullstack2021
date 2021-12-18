import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const entries = patientService.getNonSensitivePatients();
    res.send(entries);
});

patientRouter.post("/", (req, res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errMsg = "Something bad happened.";
        if (error instanceof Error) {
            errMsg = "Error: " + error.message;
        }
        res.status(400).send(errMsg);
    }
});

export default patientRouter;
