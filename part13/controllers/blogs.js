const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Blog, User } = require("../models");
const { SECRET } = require("../util/config");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: { exclude: ["userId"] },
        include: {
            model: User,
            attributes: ["name"],
        },
    });
    res.json(blogs);
});

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch (error) {
            res.status(401).json({ error: "invalid token" });
        }
    } else {
        res.status(401).json({ error: "missing token" });
    }
    next();
};

router.post("/", tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const newBlog = await Blog.create({ ...req.body, userId: user.id });
        return res.json(newBlog);
    } catch (err) {
        next(err);
    }
});

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
        req.blog = blog;
    } else {
        res.status(404).json({ error: "could not find blog" });
    }

    next();
};

router.get("/:id", blogFinder, async (req, res) => {
    const { blog } = req;
    return res.json(blog);
});

router.put("/:id", blogFinder, async (req, res, next) => {
    const { blog } = req;
    try {
        blog.likes = req.body.likes;
        await blog.save();
        return res.json(blog);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
    const { blog } = req;
    if (blog.userId === req.decodedToken.id) {
        await blog.destroy();
    } else {
        res.status(401).json({ error: "insufficient permissions" });
    }
    res.status(204).end();
});

module.exports = router;
