const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../error");

let jwt_user_token_map = {}

const generateAccessToken = async (accessTokenPayload) => {
    return await jwt.sign(accessTokenPayload, 'ACCESS_TOKEN_SECRET', {expiresIn: '1h'})
}

const generateRefreshToken = async (refreshTokenPayload) => {
    return await jwt.sign(refreshTokenPayload, 'REFRESH_TOKEN_SECRET', {expiresIn: '24h'})
}

const storeTokenInRedis = (userid, token) => {
    // We have to store token in redis
    // For the time bounding we are creating a map and storing tokens

    const refreshTokenKey = "refresh_token"+userid

    if (jwt_user_token_map[refreshTokenKey]) {
        delete jwt_user_token_map[refreshTokenKey]
    }
    
    jwt_user_token_map[refreshTokenKey] = token
}

const getUserTokensFromRedis = (userid) => {
    // We have used map insted of redis for coding purpose

    const refreshTokenKey = "refresh_token"+userid

    return jwt_user_token_map[refreshTokenKey]
}

const isExpired = (expiryUnixTime) => {
    const currentUnixTime = Date.now()
    return (expiryUnixTime - currentUnixTime > 0)
}



const CreateAccessTokenForUser = async (user) => {
    const payload = {
        id: user._id
    }
    
    const accessToken = await generateAccessToken(payload)
    const refreshToken = await generateRefreshToken(payload)

    const token =   {
        accessToken: accessToken,
        refreshToken: refreshToken
    }

    storeTokenInRedis(user._id, token.refreshToken)

    return token
}

const VerifyAccessTokenAndGetData = async (token) => {
    const data = await jwt.verify(token, 'ACCESS_TOKEN_SECRET')
    const istokenExpired = isExpired(data.exp)
    const userid = data.id

    return {
        isExpired: istokenExpired,
        userid: userid
    }
}

const VerifyRefreshTokenAndGetData = async (token) => {
    const data = await jwt.verify(token, 'REFRESH_TOKEN_SECRET')
    const istokenExpired = isExpired(data.exp)
    const userid = data.id

    return {
        isExpired: istokenExpired,
        userid: userid
    }
}

const GenerateAccessTokenForValidRefreshToken = async (userid, refreshToken) => {
    const refreshTokenFromStore = getUserTokensFromRedis(userid)
    if (!refreshToken) {
        throw new BadRequestError('Unauthorized Error')
    }

    const payload = await VerifyRefreshTokenAndGetData(refreshToken)
    if (payload.isExpired) {
        throw new BadRequestError('Refresh Token Expired, Login Again')
    }

    if (!(payload.userid == userid)) {
        throw new BadRequestError('Sorry I can not do any thing')
    }

    const newpaylaod = {
        userid: userid
    }
    return  await generateAccessToken(newpaylaod)
}

module.exports = {
    CreateAccessTokenForUser, 
    VerifyAccessTokenAndGetData,
    GenerateAccessTokenForValidRefreshToken
}