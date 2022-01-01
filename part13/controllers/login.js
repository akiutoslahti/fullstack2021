const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Session } = require("../models");
const { SECRET } = require("../util/config");
const tokenExtractor = require("../middlewares/tokenExtractor");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (user.isDisabled) {
        return res.status(401).json({ error: "disabled user account" });
    }

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

    await Session.create({ userId: user.id, token: token, isActive: true });

    return res
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

router.delete("/", tokenExtractor, async (req, res) => {
    await Session.update(
        { isActive: false },
        { where: { userId: req.decodedToken.id } }
    );
    res.status(200).end();
});

module.exports = router;
