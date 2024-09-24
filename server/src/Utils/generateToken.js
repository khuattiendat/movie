const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateAccessToken = (userId, role) => {
    return jwt.sign({
        userId,
        role
    }, process.env.JWT_ACCESS_KEY, {
        // token hết hạn sau 1d
        expiresIn: '1d'
    })
}
module.exports = {
    generateAccessToken,
}