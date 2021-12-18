import express from "express";
import getDiagnoses from "../services/diagnoseService";

const diagnoseRouter = express.Router();

diagnoseRouter.get("/", (_req, res) => {
    const entries = getDiagnoses();
    res.send(entries);
});

export default diagnoseRouter;
