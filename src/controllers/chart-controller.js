const { Respond } = require('../utils/index')
const chartservice = require('../charts/service')

const GetChartsForUser = async (req, res) => {
    const data = {
        userid: req.userid
    }

    try {
        const paylaod = await chartservice.GetChartsForUser(data)
        Respond(req, res, paylaod, null)
    } catch (error) {
        Respond(req, res, null, error)
    }
}

module.exports = {
    GetChartsForUser
}