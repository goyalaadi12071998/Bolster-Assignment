const ErrorsList = require('./errors')

const NewError = (name, description) => {
    err = ErrorsList[name]
    err.description = description
    return err
}

class CustomError extends Error {
    constructor(error) {
        super(error.message)
        this.statusCode = getStatusCode(err.code)
        this.name = error.Name
        this.code = error.code
        this.description = error.description
    }
}

function getStatusCode(code) {
    if (code.includes("INTERNAL_SERVER_ERROR")) {
        return 500
    }

    return 400
}

module.exports = {NewError, CustomError}