const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
    const usersFromDb = await User.findAll({
        include: {
            model: Blog,
            attributes: {
                exclude: ["userId"],
            },
        },
    });
    const users = usersFromDb.map((user) => {
        const { id, username, name, blogs } = user;
        return {
            id,
            username,
            name,
            blogs,
        };
    });
    res.json(users);
});

router.post("/", async (req, res, next) => {
    const { username, name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            username,
            name,
            passwordHash,
        });
        res.json({
            id: newUser.id,
            username: newUser.username,
            name: newUser.name,
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:username", async (req, res, next) => {
    const { username } = req.params;
    const { name } = req.body;

    const user = await User.findOne({ where: { username: username } });
    if (user) {
        try {
            user.name = name;
            await user.save();
            const { id, username, name, blogs } = user;
            return {
                id,
                username,
                name,
                blogs,
            };
        } catch (err) {
            next(err);
        }
    } else {
        res.status(404).json({ error: "could not find user" });
    }
});

module.exports = router;
