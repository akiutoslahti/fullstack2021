const router = require("express").Router();
const { Reading } = require("../models");
const tokenExtractor = require("../middlewares/tokenExtractor");

router.post("/", async (req, res, next) => {
    try {
        const newReading = await Reading.create({ ...req.body });
        return res.json(newReading);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
    try {
        const reading = await Reading.findByPk(req.params.id);
        if (reading) {
            if (reading.userId === req.decodedToken.id) {
                reading.isRead = req.body.read;
                reading.save();
                return res.json(reading);
            } else {
                return res.status(401).json({ error: "insufficient permissions" });
            }
        } else {
            return res.status(404).json({ error: "could not find reading" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
