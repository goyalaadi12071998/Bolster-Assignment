const { Respond } = require('../../utils/index')
const { UnauthorizedError, InternalServerError } = require('../../error')
const tokenservice = require('../../token/index')

const isLoggedIn = async (req, res, next) => {
    const accessToken = req.headers['authorization'];

    // If we have redis with ttl then we also check if token exist in redis or not
    
    if (!accessToken) {
        const err = new UnauthorizedError('Unauthorized Request')
        Respond(req, res, null, err)
        return
    }

    try {
        const payload = await tokenservice.VerifyAccessTokenAndGetData(accessToken)
        req.userid = payload.userid
        next()
    } catch (error) {
        if (error.name = 'TokenExpiredError') {
            const err = new UnauthorizedError('Unauthorized Request')
            Respond(req, res, null, err)
            return
        }

        const err = new InternalServerError('Error in validating data')
        Respond(req, res, null, err)
        return
    }
}

module.exports = {isLoggedIn}