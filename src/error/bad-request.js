class BadRequestError extends Error {
    constructor(message) {
        super(message)

        this.statusCode = 400
        this.description = message
        this.code = "BAD_REQUEST_ERROR"
    }
}

module.exports = BadRequestError