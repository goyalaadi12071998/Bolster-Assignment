const { Respond } = require('../../utils/index')
const { BadRequestError } = require('../../error')
const tokenservice = require('../../token/index')

const isLoggedIn = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    
    if (!accessToken) {
        const err = new BadRequestError('Unauthorized Request')
        Respond(req, res, null, err)
        return
    }

    const payload = await tokenservice.VerifyAccessTokenAndGetData(accessToken)
    if (payload.isExpired) {
        const err = new BadRequestError('Unauthorized Request')
        Respond(req, res, null, err)
        return
    }

    req.userid = payload.userid
    
    next()
}

module.exports = {isLoggedIn}