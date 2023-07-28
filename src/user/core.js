const User = require('../models/user-model')
const { FindOne } = require('../providers/db/queries')

const FindOneUser = async (filter) => {
    let userData = await FindOne(User, filter)
    return userData
}

module.exports = {FindOneUser}