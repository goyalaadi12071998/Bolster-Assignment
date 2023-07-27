const Respond = require('./utils')
const errorclass = require('../error/error-class')
const errors = require('../error/errors')

const LoginUser = async (req, res) => {
    error = errorclass.CustomError(errorclass.NewError(errors.BadRequestNotFoundHandler), "Path not exist")
}

module.exports = {
    LoginUser
}