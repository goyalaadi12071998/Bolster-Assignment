const Product = require('../models/products')
const { FindAll } = require('../providers/db/queries')

const GetAllProducts = async (filter) => {
	return await FindAll(Product, filter)
} 

const GetProductsDataForFeatures = async (featureIds) => {
	const featuresfilter = {
		"features.featureId": {$in: featureIds}
	}

	const productsData = await FindAll(Product, featuresfilter)
	return productsData
}

module.exports = {
	GetAllProducts,
	GetProductsDataForFeatures
}