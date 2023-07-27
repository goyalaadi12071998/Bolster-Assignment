const productscore = require('./core')

const GetAllProducts = async () => {
    const filter = {}
    const res = await productscore.GetAllProducts(filter)
    return res
} 

module.exports = {
    GetAllProducts
}