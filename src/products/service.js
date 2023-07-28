const userservice = require('../user/service')
const productscore = require('./core')

const GetAllProducts = async () => {
    const filter = {}
    const res = await productscore.GetAllProducts(filter)
    return res
} 

const FetchUserProducts = async (data) => {
    const profilefilter = {
        userid: data.userid
    }
    const userdata = await userservice.GetProfileData(profilefilter)
    const userproductFeatureIds = userdata.productFeatures
    const productsData = await productscore.GetProductsDataForFeatures()
    return productsData
}

module.exports = {
    GetAllProducts,
    FetchUserProducts
}