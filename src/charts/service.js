const userservice = require('../user/service')
const chartscore = require('./core')

const GetChartsForUser = async (data) => {
    const profilefilter = {
        userid: data.userid
    }
    const userdata = await userservice.GetProfileData(profilefilter)
    const usercharIds = userdata.charts
    const chartsData = await chartscore.GetChartsDataForUserCharts(usercharIds)

    var response = []

    for (index in chartsData) {
        const chartData = chartsData[index]
        const localsJsonData = JSON.parse(chartData.locals)
        const dataJson = JSON.parse(chartData.data)

        const temp = {
            id: chartData.id,
            chartId: chartData.chartId,
            title: chartData.title,
            dataType: chartData.dataType,
            locals: localsJsonData,
            data: dataJson,
            createdAt: chartData.createdAt,
            updatedAt: chartData.updatedAt
        }        

        response.push(temp)
    }

    return response
}

module.exports = {
    GetChartsForUser
}