const errorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel')

const authenticate = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler('only logged in user can access !', 404))
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id } = decoded;
    req.user = await User.findById(id);
    next()
}

module.exports = authenticate;