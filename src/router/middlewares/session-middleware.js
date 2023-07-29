const { Respond } = require('../../utils/index')
const { BadRequestError, UnauthorizedError } = require('../../error')
const tokenservice = require('../../token/jwt-token')

const isLoggedIn = async (req, res, next) => {
    const userid = req.headers['x-user-id']
    const accessToken =  req.headers['x-access-token']
    
    if (!userid || !accessToken) {
        const error = new BadRequestError('UserId or AccessToken is not set in headers')
        Respond(req, res, null, error)
        return
    }
    
    try {
        await tokenservice.VerifyAccessToken(userid, accessToken)
        req.userid = userid
        next()
    } catch (error) {
        const err = new UnauthorizedError(error.message)
        Respond(req, res, null, err)
        return
    }

}

module.exports = {isLoggedIn}