import express from "express";
import getDiagnoses from "../services/diagnosisService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
    const entries = getDiagnoses();
    res.send(entries);
});

export default diagnosisRouter;
