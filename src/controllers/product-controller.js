const { Respond } = require('../utils/index')
const productservice = require('../products/service')

const ListAllProducts = async (req, res) => {
    try {
        payload = await productservice.GetAllProducts()
        Respond(req, res, payload, null)
    } catch (error) {
        Respond(req, res, null, error)
    }
}

const FetchUserProducts = async (req, res) => {
    const data = {
        userid: req.userid
    }

    try {
        const payload = await productservice.FetchUserProducts(data)
        Respond(req, res, payload, null)
    } catch (error) {
        Respond(req, res, null, error)
    }
} 

module.exports = {
    ListAllProducts,
    FetchUserProducts
}