import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
        res.send({
            error: "malformatted parameters",
        });
    }

    const height = Number(req.query.height as string);
    const mass = Number(req.query.weight as string);

    const bmi = calculateBmi({ height, mass });

    res.send({
        weight: mass,
        height: height,
        bmi: bmi,
    });
});

interface ExerciseRequest extends express.Request {
    body: {
        daily_exercises: Array<string>;
        target: string;
    };
}

app.post("/exercises", (req: ExerciseRequest, res) => {
    const body = req.body;
    if (body.daily_exercises === undefined || body.target === undefined) {
        res.send({
            error: "parameters missing",
        });
    } else {
        const target = Number(body.target);
        const hours = body.daily_exercises.map(Number);

        if (isNaN(target) || hours.filter(isNaN).length != 0) {
            res.send({
                error: "malformatted parameters",
            });
        } else {
            const exercises = calculateExercises(hours, target);
            res.send(exercises);
        }
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
