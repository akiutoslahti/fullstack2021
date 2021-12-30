const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post("/", async (req, res, next) => {
    try {
        const newBlog = await Blog.create(req.body);
        return res.json(newBlog);
    } catch (error) {
        next(error);
    }
});

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    next();
};

router.get("/:id", blogFinder, async (req, res) => {
    const { blog } = req;
    if (blog) {
        return res.json(blog);
    } else {
        res.status(404).end();
    }
});

router.put("/:id", blogFinder, async (req, res, next) => {
    const { blog } = req;
    if (blog) {
        try {
            blog.likes = req.body.likes;
            await blog.save();
            return res.json(blog);
        } catch (error) {
            next(error);
        }
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", blogFinder, async (req, res) => {
    const { blog } = req;
    if (blog) {
        await blog.destroy();
    }
    res.status(204).end();
});

module.exports = router;
