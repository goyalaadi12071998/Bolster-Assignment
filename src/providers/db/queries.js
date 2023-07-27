const mongoose = require('mongoose')
const errors = require('../../error')

const FindOne = async (model, filter) => {
    try {
        const response = await model.findOne(filter)
        return response
    } catch (err) {
        throw new errors.InternalServerError('Error in fetching data from db')
    }
}

const FindAll = async (model, filter) => {
    try {
        const response = await model.find(filter)
        return response
    } catch (err) {
        throw new errors.InternalServerError('Error in fetching data from db')
    }
}

module.exports = {
    FindOne,
    FindAll,
}