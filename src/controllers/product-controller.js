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

module.exports = {ListAllProducts}