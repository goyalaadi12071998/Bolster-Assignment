const User = require('../models/user-model')

const FindOneUser = async (filter) => {
    try {
        res = await User.findOne(filter)
        return res  
    } catch (err) {
        console.log(err)
        throw new Error('Unk')
    }
}

module.exports = {FindOneUser}