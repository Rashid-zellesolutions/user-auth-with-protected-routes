const jwt = require('jsonwebtoken');
const JWT_SECRATE = "thisissecratekey";

const generateToken = (user) => {
    return jwt.sign({id: user._id, email: user.email}, JWT_SECRATE, {expiresIn: '1h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRATE);
}

module.exports = {generateToken, verifyToken}