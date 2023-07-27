const Respond = require('../utils/index')
const errors = require('../error/index')
const userservice = require('../user/service')
const tokenservice = require('../token/index')

const LoginUser = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        const err = new errors.BadRequestError('Invalid Data')
        Respond(req, res, null, err)
    }

   const loginData = {
        email: email,
        password: password
    }

    try {
        const payload = await userservice.LoginUser(loginData)
        const token = await tokenservice.CreateAccessTokenForUser(payload)
        
        res.set('X-USER-ID', payload._id)
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
        })
        res.cookie("refresh_token", token.refreshToken, {
            httpOnly: true,
            secure: true
        })
        
        Respond(req, res, payload, null)
    } catch (err) {
        Respond(req, res, null, err)
    }
}

module.exports = {
    LoginUser
}