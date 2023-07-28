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
    const productsData = await productscore.GetProductsDataForFeatures(userproductFeatureIds)

    var response = [];
    for (index in productsData) {
        let productData = productsData[index]
        let features = []

        for (index2 in productData.features) {
            if (userproductFeatureIds.includes(productData.features[index2].featureId)) {
                features.push(productData.features[index2])
            }
        }

        let tempResponse = {
            productId: productData.productId,
            productName: productData.productName,
            features: features
        }

        response.push(tempResponse)
    }

    return response
}

module.exports = {
    GetAllProducts,
    FetchUserProducts
}