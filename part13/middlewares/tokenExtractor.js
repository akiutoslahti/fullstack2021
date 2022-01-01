const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Session } = require("../models");

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            const token = authorization.substring(7);
            const session = await Session.findOne({ where: { token: token } });

            if (!session || !session.isActive) {
                return res.status(401).json({ error: "expired token" });
            }

            req.decodedToken = jwt.verify(token, SECRET);
        } catch (error) {
            return res.status(401).json({ error: "invalid token" });
        }
    } else {
        return res.status(401).json({ error: "missing token" });
    }
    next();
};

module.exports = tokenExtractor;
