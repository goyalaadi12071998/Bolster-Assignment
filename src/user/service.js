const utils = require('../utils/index')

const { BadRequestError, InternalServerError } = require('../error')
const usercore = require('./core')

const LoginUser = async (loginData) => {
    let filter = {email: loginData.email}
    let user = await usercore.FindOneUser(filter)

    if (!user) {
        throw new BadRequestError('No user associated with this email')
    }

    const isValidatePassword = await utils.ValidatePassword(loginData.password, user.password)
    if (!isValidatePassword) {
        throw new BadRequestError('Credentials does not match')
    }

    return user
}

const GetProfileData = async (data) => {
    let filter = {_id: data.userid}
    return await usercore.FindOneUser(filter)
}

module.exports = {
    LoginUser,
    GetProfileData
}