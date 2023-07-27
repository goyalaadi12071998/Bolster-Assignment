const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
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
},{
    toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        }
    }
})

module.exports = mongoose.model('Product', ProductSchema)