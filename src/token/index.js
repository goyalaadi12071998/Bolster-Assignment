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
    
    // This will only work when server runs without stopped because we are using a local variable instead of redis.
    // Commenting the code for now.
    
    // const refreshTokenFromStore = getUserRefreshTokensFromRedis(userid)
    
    // if (!refreshToken || !refreshTokenFromStore) {
    //     throw new BadRequestError('Unauthorized Error, Refresh Token Expires')
    // }

    // if (refreshToken != refreshTokenFromStore) {
    //     throw new BadRequestError('Unauthorized Error, Refresh token does not match')
    // }

    try {
        const payload = await VerifyRefreshTokenAndGetData(refreshToken)
        if (!(payload.userid == userid)) {
            throw new UnauthorizedError('Sorry I can not do any thing')
        }    
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            throw new UnauthorizedError('Sorry I can not do any thing')
        }

        throw new BadRequestError('Error in validating data')
    }

    const newpaylaod = {
        id: userid
    }
    return  await generateAccessToken(newpaylaod)
}

module.exports = {
    CreateAccessTokenForUser, 
    VerifyAccessTokenAndGetData,
    GenerateAccessTokenForValidRefreshToken
}