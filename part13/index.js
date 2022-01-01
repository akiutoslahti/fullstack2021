const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/readingList");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);

const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        const error = err.errors.map((error) => error.message);
        return res.status(400).send({ error });
    } else if (err.name === "SequelizeDatabaseError") {
        return res.status(400).send({ error: err.message });
    } else {
        console.log(error);
        return res.status(400).send({ error: "unexpected error" });
    }
};

app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
