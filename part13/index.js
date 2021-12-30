const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        return res.status(400).send({ error: "request is missing data" });
    } else if (err.name === "SequelizeDatabaseError") {
        return res.status(400).send({ error: "request contains invalid data" });
    } else {
        return res.status(400).send({ error: "unknown error" });
    }
};

app.use(errorHandler);

start();
