const mongoose = require('mongoose')

const ChartSchema = new mongoose.Schema({
    chartId: {
        type: String,
    },
    title: {
        type: String,
    },
    dataType: {
        type: String,
    },
    locals: {
        type: String
    },
    data: {
        type: String
    }
}, {
    timestamps: true
}, {
    toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        }
    }
})

module.exports = mongoose.model('Chart', ChartSchema)