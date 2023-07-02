
class errorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;

        Error.captureStackTrace(this, this.constrconstructor);
    }
}

module.exports = errorHandler;