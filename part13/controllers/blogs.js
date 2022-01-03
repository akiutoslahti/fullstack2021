const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");

const tokenExtractor = require("../middlewares/tokenExtractor");

router.get("/", async (req, res) => {
    const { search } = req.query;

    let where = {};

    if (search) {
        where = {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
                {
                    author: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
            ],
        };
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ["userId"] },
        include: {
            model: User,
            attributes: ["name"],
        },
        where,
        order: [["likes", "DESC"]],
    });
    res.json(blogs);
});

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
        return res.status(404).json({ error: "could not find blog" });
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
        return res.status(401).json({ error: "insufficient permissions" });
    }
    res.status(204).end();
});

module.exports = router;
