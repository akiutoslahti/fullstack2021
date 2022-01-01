const router = require("express").Router();
const { Reading } = require("../models");

router.post("/", async (req, res, next) => {
    try {
        const newReading = await Reading.create({ ...req.body });
        return res.json(newReading);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
