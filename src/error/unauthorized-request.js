class UnauthorizedError extends Error {
    constructor(message) {
        super(message)

        this.statusCode = 401
        this.code = 'UNAUTHORIZED_REQUEST'
        this.description = message
    }
}

module.exports = UnauthorizedError