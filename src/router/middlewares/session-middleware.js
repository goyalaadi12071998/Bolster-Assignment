const { Respond } = require('../../utils/index')
const { BadRequestError } = require('../../error')
const tokenservice = require('../../token/index')

const isLoggedIn = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    
    if (!accessToken) {
        Respond(req, res, null, new BadRequestError('Unauthorized Request'))
    }

    const payload = await tokenservice.VerifyAccessTokenAndGetData(accessToken)
    if (payload.isExpired) {
        Respond(req, res, null, new BadRequestError('Unauthorized Request'))
    }

    req.userid = payload.userid
    
    next()
}

module.exports = {isLoggedIn}