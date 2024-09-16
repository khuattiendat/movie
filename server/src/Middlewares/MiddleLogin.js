const jwt = require('jsonwebtoken');
require('dotenv').config();
const MiddlewareLogin = {
    verifyToken: (req, res, next) => {
        //lấy ra token mà client gửi lên
        const token = req.headers.token;
        if (token) {
            // token có dạng token: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2ODc3MTM2MzYsImV4cCI6MTcxOTI0OTYzNn0.j9WfXV4w4kWxRtJj-irCPaGxr1idffibZuVPnzrILVU
            const accessToken = token.split(" ")[1];
            const key = process.env.JWT_ACCESS_KEY
            jwt.verify(accessToken, key, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        error: true,
                        data: null,
                        message: "Token is not valid"
                    });
                }
                req.user = user;
                return next();
            });
        } else {
            return res.status(401).json(
                {
                    error: true,
                    data: null,
                    message: "You are not authenticated!"
                }
            );
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        MiddlewareLogin.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                return next();
            } else {
                return res.status(403).json(
                    {
                        error: true,
                        data: null,
                        message: "You're not allowed to do that!"
                    }
                );
            }
        })
    },
}
module.exports = MiddlewareLogin;