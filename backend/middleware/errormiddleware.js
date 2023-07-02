
const errormiddleware = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server error "

    res.status(err.statuscode).json({
        sucesss: false,
        message: err.message
    });
}


module.exports = errormiddleware;