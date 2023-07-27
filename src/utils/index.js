const bcrypt = require('bcrypt');

async function HashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

async function ValidatePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

const Respond = (req, res, payload, error) => {
    if (error != null) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.desciption,
            code: error.code
        })
    }

    return res.status(200).send({
        success: true,
        data: payload
    })  
}

module.exports = { HashPassword, ValidatePassword, Respond }