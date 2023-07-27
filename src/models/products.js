const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
    },
    productName: {
        type: String,
    },
    features: {
        type: [{
            featureId: {type: String},
            featureName: {type: String},
            price: {type: Number}
        }]
    }
})

module.exports = mongoose.Model('Product', ProductSchema)