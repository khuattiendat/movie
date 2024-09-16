const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateAccessToken = (userId, isAdmin) => {
    return jwt.sign({
        userId,
        isAdmin
    }, process.env.JWT_ACCESS_KEY, {
        // token hết hạn sau 10m
        expiresIn: '10m'
    })
}
module.exports = {
    generateAccessToken,
}