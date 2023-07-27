const { error } = require('console');
const { Respond } = require('../../utils/index')
const { BadRequestError } = require('../error')
const tokenservice = require('../../token/index')

const isLoggedIn = (req, res, next) => {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token']

    const err = BadRequestError('Unauthorized Request')

    if (!accessToken && !refreshToken) {
        Respond(req, res, null, err)
    }

    const userid = req.headers['X-USER-ID'];

    const token = tokenservice.GetUserTokensFromRedis(userid)

    // If both the tokens are not in redis means the user is logged out
    // There can be two case 
    // 1. When he log out we remove the tokens from redis specifically
    // 2. Tokens are removed from redis after a certain time (TTL)
    if (!token.accessToken && !token.refreshToken) {
        Respond(req, res, null, err)
    }

    // In this case we will generate a new access token for the user
    if (!token.accessToken && token.refreshToken) {
        // Generate a new access token and set in cookie
    }

    if (token.accessToken != accessToken) {
        Respond(req, res, null, err)
    }

    next()
}

module.exports = isLoggedIn