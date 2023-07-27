const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../error");

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

    await storeTokenInRedis(user, token.refreshToken)

    return token
}

const GetUserTokensFromRedis = async (userid) => {
    // We have used map insted of redis for coding purpose

    const refreshTokenKey = "refresh_token"+userid

    return refreshTokenKey
}

const VerifyAccessTokenAndGetData = async (token) => {
    const data = await jwt.verify(token, 'ACCESS_TOKEN_SECRET')
    const isExpired = isExpired(data.exp)
    const userid = data.id

    return {
        isExpired: isExpired,
        userid: userid
    }
}

const GenerateAccessTokenForValidRefreshToken = async (refreshToken) => {
    const userid = req.headers['X-User-Id']
    const refreshToken = GetUserTokensFromRedis(userid)

    const payload = await VerifyAccessTokenAndGetData(refreshToken)
    if (payload.isExpired) {
        throw new BadRequestError('Refresh Token Expired, Login Again')
    }

    if (!(payload.userid == userid)) {
        throw new BadRequestError('Sorry I can not do any thing')
    }

    return generateNewAccessToken(userid)
}

const storeTokenInRedis = async (user, token) => {
    // We have to store token in redis
    // For the time bounding we are creating a map and storing tokens

    const refreshTokenKey = "refresh_token"+user._id

    jwt_user_token_map[refreshTokenKey] = token
}

const isExpired = (expiryUnixTime) => {
    const currentUnixTime = Date.now()
    return (expiryUnixTime - currentUnixTime > 0)

}

module.exports = {
    CreateAccessTokenForUser, 
    GetUserTokensFromRedis,
    VerifyAccessTokenAndGetData,
    GenerateAccessTokenForValidRefreshToken
}