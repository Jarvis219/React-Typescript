import {
    tokenList
} from "../controllers/auth";
import jwt from "jsonwebtoken";
const utils = require("../utils");

export const refreshToken = (req, res, next) => {
    const {
        refreshToken
    } = req.body;
    if ((refreshToken) && (refreshToken in tokenList)) {
        try {
            utils.verifyJwtToken(refreshToken, process.env.JWT_REFRESH_TOKEN);

            const user = tokenList[refreshToken];

            const token = jwt.sign({
                    _id: user._id,
                },
                process.env.JWT_SECRET, {
                    expiresIn: "36000s",
                }
            );
            res.status(200).json({
                token
            })
        } catch (error) {
            res.status(403).json({
                message: 'Invalid refresh token',
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid request',
        });
    }

}