const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateAccessToken = (userId, roleId) => {
    return jwt.sign({
        userId,
        roleId
    }, process.env.JWT_ACCESS_KEY, {
        // token hết hạn sau 30s
        expiresIn: '10m'
    })
}
module.exports = {
    generateAccessToken,
}