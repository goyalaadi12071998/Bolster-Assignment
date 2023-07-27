class InternalServerError extends Error {
    constructor(message) {
        super(message)

        this.statusCode = 500
        this.desciption = message
        this.code = "INTERNAL_SERVER_ERROR"
    }
}

module.exports = InternalServerError