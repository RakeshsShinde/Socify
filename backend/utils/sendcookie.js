
const sendCookie = async (user = {}, res, statusCode) => {
    const token = await user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        sucess: true,
        user
    })
}

module.exports = sendCookie;