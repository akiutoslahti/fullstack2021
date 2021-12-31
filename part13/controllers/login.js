const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { User } = require("../models");
const { SECRET } = require("../util/config");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
        return res.status(401).json({ error: "invalid username or password" });
    }

    const userForToken = {
        id: user.id,
        username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
