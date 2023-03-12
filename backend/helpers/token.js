const jwt = require('jsonwebtoken')
require('dotenv').config()

const createJWT = (data) => {
    console.log(data)
    return jwt.sign(data, process.env.JWT_TOKEN_SECRATE, { expiresIn: "1d"})
}



module.exports = {createJWT};