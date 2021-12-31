const router = require("express").Router();
const sequelize = require("sequelize");
const { Blog } = require("../models");

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({
        group: "author",
        attributes: [
            "author",
            [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
            [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
        ],
        order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
    });
    return res.json(blogs);
});

module.exports = router;
