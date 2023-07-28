const { FindAll } = require('../providers/db/queries')
const Charts = require('../models/analytics')

const GetChartsDataForUserCharts = async (chartIds) => {
    const filter = {
        "chartId": {$in: chartIds}
    }

    const charts = await FindAll(Charts, filter)
    return charts
}

module.exports = {
    GetChartsDataForUserCharts
}