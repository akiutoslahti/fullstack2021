import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    const entries = patientService.getPublicPatients();
    res.send(entries);
});

patientRouter.post("/", (req, res) => {
    try {
        const newEntry = toNewPatient(req.body);
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

patientRouter.get("/:id", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);

    if (patient) {
        res.json(patient);
    } else {
        res.status(400).send("Invalid id");
    }
});

patientRouter.post("/:id/entries", (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(
            req.params.id,
            newEntry
        );
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
