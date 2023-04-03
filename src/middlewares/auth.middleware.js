import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/index.js";

const getToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.length > 0) {
        return req.headers.authorization.split(/\s+/)[1];
    }

    return "";
};

export async function authJWT(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json("No token provided!");
    }

    jwt.verify(token, config.token_secret, async (error, decoded) => {
        if (error) {
            return res.status(httpStatus.UNAUTHORIZED).json("Failed to authenticate token!");
        } else {
            const userId = decoded.id;

            req.user = {
                userId,
                /// ... join more fields
            };

            return next();
        }
    });
}
