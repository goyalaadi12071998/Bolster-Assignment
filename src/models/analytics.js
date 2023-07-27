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
})

module.exports = mongoose.Model('Chart', ChartSchema)