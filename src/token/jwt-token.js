const jwt = require("jsonwebtoken");
const redisClient = require('../providers/redis');
const { UnauthorizedError } = require("../error");

const getAccessTokenKey = (userId) => {
    return `access_token:${userId}`
}

const getRefreshTokenKey = (userId) => {
    return `refresh_token:${userId}`
}

const generateAccessTokenForUser = async (userId) => {
    return await jwt.sign({userId: userId}, 'ACCESS_TOKEN_SECRET', {expiresIn: '1h'})
}

const getAccessTokenData = async (accessToken) => {
    return await jwt.verify(accessToken, 'ACCESS_TOKEN_SECRET')
}

const generateRefreshTokenForUser = async (userId) => {
    return await jwt.sign({userId: userId}, 'REFRESH_TOKEN_SECRET', {expiresIn: '24h'})
}

const getRefreshTokenData = async (refreshToken) => {
    return await jwt.verify(refreshToken, 'REFRESH_TOKEN_SECRET')
}


const storeAccessTokenInRedis = async (userId, accessToken) => {
    const accessTokenKey = getAccessTokenKey(userId)
    await deleteAccessTokenFromRedis(userId)
    const accessTokenExpiry = 60*60*1
    await redisClient.Set(accessTokenKey, accessToken, accessTokenExpiry)
}

const storeRefreshTokenInRedis = async (userId, refreshToken) => {
    const refreshTokenKey = getRefreshTokenKey(userId)
    const refreshTokenExpiry = 60*60*24
    await redisClient.Set(refreshTokenKey, refreshToken, refreshTokenExpiry)
}

const deleteAccessTokenFromRedis = async (userId) => {
    const accessTokenKey = getAccessTokenKey(userId)
    await redisClient.Delete(accessTokenKey)
}

const deleteRefreshTokenFromRedis = async (userId) => {
    const refreshTokenKey = getRefreshTokenKey(userId)
    await redisClient.Delete(refreshTokenKey)
}

const getAccessTokenFromRedis = async (userId) => {
    const accessTokenKey = getAccessTokenKey(userId)
    const accessToken = await redisClient.Get(accessTokenKey)
    return accessToken
}

const getRefreshTokenFromRedis = async (userId) => {
    const refreshTokenKey = getRefreshTokenKey(userId)
    return await redisClient.Get(refreshTokenKey)
}

const CreateAccessTokenForUser = async (userId) => {
    const accessToken = await generateAccessTokenForUser(userId)
    await storeAccessTokenInRedis(userId, accessToken)
    return accessToken
}

const CreateNewAccessTokenForRefreshToken = async (userId) => {
    await deleteAccessTokenFromRedis(userId)
    return await CreateAccessTokenForUser(userId)
}

const CreateRefreshTokenForUser = async (userId) => {
    const refreshToken = await generateRefreshTokenForUser(userId)
    await storeRefreshTokenInRedis(userId, refreshToken)
    return refreshToken
}

const VerifyAccessToken = async (userId, accessToken) => {
    if (!accessToken) {
        throw new UnauthorizedError('Access Token Required')
    }

    const payload = await getAccessTokenData(accessToken)
    const accessTokenFromRedis = await getAccessTokenFromRedis(userId)

    if(!accessTokenFromRedis) {
        throw new UnauthorizedError('Access Token Required')
    }

    if ((accessToken != accessTokenFromRedis) || (payload.userId != userId)) {
        throw new UnauthorizedError('Access Token Does Not Match')
    }
}

const VerifyRefreshToken = async (userId, refreshToken) => {
    if (!refreshToken) {
        throw new UnauthorizedError('Refresh Token Required')
    }

    const payload = await getRefreshTokenData(refreshToken)
    const refreshTokenFromRedis = await getRefreshTokenFromRedis(userId)

    if (!refreshTokenFromRedis) {
        throw new UnauthorizedError('Refresh Token Expired')   
    }

    if ((refreshTokenFromRedis != refreshToken) || (payload.userId != userId)) {
        throw new UnauthorizedError('Refresh Token Required')
    }
}

const DeleteTokensForUser = async (userId) => {
    await deleteAccessTokenFromRedis(userId)
    await deleteRefreshTokenFromRedis(userId)
}

module.exports = {
    CreateAccessTokenForUser,
    CreateRefreshTokenForUser,
    VerifyAccessToken,
    VerifyRefreshToken,
    DeleteTokensForUser,
    CreateNewAccessTokenForRefreshToken
}