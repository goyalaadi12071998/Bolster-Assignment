const { model } = require('mongoose');
const redis = require('redis');
const { InternalServerError } = require('../../error');

var redisclient;

const connectRedis = async () => {
    const client = redis.createClient()
    try {
        await client.connect()
        console.log('Redis connected successfully')
        redisclient = client
    } catch (error) {
        throw error
    }
}

const Set = async (key, value, expirytime) => {
    try {
        await redisclient.set(key, value, 'EX', expirytime)
    } catch (err) {
        throw new err
    }
}

const Get = async (key) => {
    try {
        const value = await redisclient.get(key)
        return value
    } catch (err) {
        throw new InternalServerError(err.message)
    }
}

const Delete = async (key) => {
    try {
        await redisclient.del(key)
        const value = await redisclient.get(key)
        return
    } catch(err) {
        throw new InternalServerError(err.message)
    }
}

module.exports = {
    connectRedis,
    Set,
    Get,
    Delete
}