import express from "express";
import cors from "cors";
import patientRouter from "./routes/patientRouter";
import diagnosisRouter from "./routes/diagnosisRouter";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const baseurl = "/api";

app.get(`${baseurl}/ping`, (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.use(`${baseurl}/patients`, patientRouter);
app.use(`${baseurl}/diagnoses`, diagnosisRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
