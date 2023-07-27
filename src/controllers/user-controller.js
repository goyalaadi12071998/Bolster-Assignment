const {Respond} = require('../utils/index')
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
        
        res.set('X-User-Id', payload._id)
        res.set('X-Access-Token', token.accessToken)
        res.set('X-Refresh-Token', token.refreshToken)
        
        Respond(req, res, payload, null)
    } catch (err) {
        Respond(req, res, null, err)
    }
}

const RefreshToken = async (req, res) => {
    try {
        const token = tokenservice.GenerateAccessTokenForValidRefreshToken(req)
        res.set('X-Access-Token', token)
        Respond(req, res, null, null)
    } catch (error) {
        Respond(req, res, null, err)
    }
}

module.exports = {
    LoginUser,
    RefreshToken
}