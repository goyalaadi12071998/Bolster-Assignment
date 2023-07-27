const mongoose = require('mongoose')
const utils = require('../utils/index')

const UserSchema = mongoose.Schema({
    email: { 
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: { 
        type: String 
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    displayname: {
        type: String 
    },
    profile: {
        type: String 
    },
    organization: {
        type: String 
    },
    dob: { 
        type: String 
    },
    password: {
        type: String 
    },
    charts: {
        type: [String] 
    },
    productFeatures: {
        type: [String] 
    }
}, {timestamp: true})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await utils.HashPassword(this.password)
});

module.exports = mongoose.model('User', UserSchema)