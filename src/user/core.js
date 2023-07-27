const User = require('../models/user-model')
const { FindOne } = require('../providers/db/queries')

const FindOneUser = async (filter) => {
    return await FindOne(User, filter)
}

module.exports = {FindOneUser}