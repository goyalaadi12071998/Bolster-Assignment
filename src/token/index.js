const jwt = require("jsonwebtoken");

let jwt_user_token_map = {}

const CreateAccessTokenForUser = async (user) => {
    const payload = {
        id: user._id
    }
    const accessToken = jwt.sign(payload, 'ACCESS_TOKEN_SECRET', {expiresIn: '1h'})
    const refreshToken = jwt.sign(payload, 'REFRESH_TOKEN_SECRET', {expiresIn: '24h'})

    await accessToken
    await refreshToken

    const token =   {
        accessToken: accessToken,
        refreshToken: refreshToken
    }

    await storeTokenInRedis(user, token)

    return token
}

const storeTokenInRedis = async (user, token) => {
    // We have to store token in redis
    // For the time bounding we are creating a map and storing tokens
    const accessTokenKey = "access_token:"+user._id
    const refreshTokenKey = "refresh_token"+user._id

    jwt_user_token_map[accessTokenKey] = token.accessToken
    jwt_user_token_map[refreshTokenKey] = token.refreshToken
}

const GetUserTokensFromRedis = async (userid) => {
    // We have used map insted of redis for coding purpose

    const accessTokenKey = "access_token:"+userid
    const refreshTokenKey = "refresh_token"+userid

    return {
        accessToken: jwt_user_token_map[accessTokenKey],
        refreshToken: jwt_user_token_map[refreshTokenKey]
    }
}

module.exports = {CreateAccessTokenForUser, GetUserTokensFromRedis}