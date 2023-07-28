const jwt = require("jsonwebtoken");
const { UnauthorizedError, BadRequestError } = require("../error");

let jwt_user_token_map = {}

const generateAccessToken = async (accessTokenPayload) => {
    return await jwt.sign(accessTokenPayload, 'ACCESS_TOKEN_SECRET', {expiresIn: '1h'})
}

const generateRefreshToken = async (refreshTokenPayload) => {
    return await jwt.sign(refreshTokenPayload, 'REFRESH_TOKEN_SECRET', {expiresIn: '24h'})
}

const storeTokenInRedis = (userid, token) => {
    // We have to store token in redis
    // Because of the time boundation we are creating a map and storing tokens
    // Only work when system continuosly works because the variable will be reintialized if sever stoppes

    const refreshTokenKey = "refresh_token"+userid

    if (jwt_user_token_map[refreshTokenKey]) {
        delete jwt_user_token_map[refreshTokenKey]
    }
    
    jwt_user_token_map[refreshTokenKey] = token
}

const getUserRefreshTokensFromRedis = (userid) => {
    // We have used map insted of redis for coding purpose

    const refreshTokenKey = "refresh_token"+userid

    return jwt_user_token_map[refreshTokenKey]
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
    const userid = data.id

    return {
        userid: userid
    }
}

const VerifyRefreshTokenAndGetData = async (token) => {
    const data = await jwt.verify(token, 'REFRESH_TOKEN_SECRET')
    const userid = data.id

    return {
        userid: userid
    }
}

const GenerateAccessTokenForValidRefreshToken = async (userid, refreshToken) => {
    
    // This will only work when server runs without stopped because we are using a local variable instead of redis.
    // Commenting the code for now.
    
    // const refreshTokenFromStore = getUserRefreshTokensFromRedis(userid)
    
    // if (!refreshToken || !refreshTokenFromStore) {
    //     throw new BadRequestError('Unauthorized Error, Refresh Token Expires')
    // }

    // if (refreshToken != refreshTokenFromStore) {
    //     throw new BadRequestError('Unauthorized Error, Refresh token does not match')
    // }

    // Asking user id to verify if it is accessing the refreshing token for the correct user

    try {
        const payload = await VerifyRefreshTokenAndGetData(refreshToken)
        if (!(payload.userid == userid)) {
            throw new UnauthorizedError('Refresh Token Id and User id does not match')
        }    

        const newpaylaod = {
            id: payload.userid
        }

        return  await generateAccessToken(newpaylaod)
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            throw new UnauthorizedError('Sorry I can not do any thing')
        }

        throw new BadRequestError(error.message)
    }
}

module.exports = {
    CreateAccessTokenForUser, 
    VerifyAccessTokenAndGetData,
    GenerateAccessTokenForValidRefreshToken
}