const {Respond} = require('../utils/index')
const errors = require('../error/index')
const userservice = require('../user/service')
const tokenservice = require('../token/jwt-token')

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
        const accessToken = await tokenservice.CreateAccessTokenForUser(payload.id)
        const refreshToken = await tokenservice.CreateRefreshTokenForUser(payload.id)
        
        res.set('x-user-id', payload._id)
        res.set('x-access-token', accessToken)
        res.set('x-refresh-token', refreshToken)
        
        Respond(req, res, payload, null)
    } catch (err) {
        Respond(req, res, null, err)
    }
}

const Logout = async (req, res) => {
    try {
        const userId = req.headers['x-user-id']
        if(!userId) {
            throw new errors.BadRequestError('UsedId is not set in headers')
        }
        await tokenservice.DeleteTokensForUser(userId)
        Respond(req, res, null, null)
        return
    } catch (error) {
        Respond(req, res, null, error)
        return
    }
}

const GetProfileData = async (req, res) => {
    const userid = req.userid
    const data = {
        userid: userid
    }
    try {
        const paylaod = await userservice.GetProfileData(data)
        Respond(req, res, paylaod, null) 
    } catch (error) {
        Respond(req, res, null, error)
    }
}

const RefreshToken = async (req, res) => {
    try {
        const userid = req.headers['x-user-id']
        const refreshToken = req.headers['x-refresh-token']

        if (!userid || !refreshToken) {
            throw new errors.BadRequestError('UserId or RefreshToken is not set in headers')
        }
        
        await tokenservice.VerifyRefreshToken(userid, refreshToken)
        await tokenservice.CreateAccessTokenForUser(userid)

        const accessToken = await tokenservice.CreateNewAccessTokenForRefreshToken(userid)
        res.set('x-access-token', accessToken)

        Respond(req, res, null, null)
    } catch (error) {
        Respond(req, res, null, error)
    }
}

module.exports = {
    LoginUser,
    RefreshToken,
    GetProfileData,
    Logout
}