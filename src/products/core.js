const Product = require('../models/products')
const { FindAll } = require('../providers/db/queries')

const GetAllProducts = async (filter) => {
	return await FindAll(Product, filter)
} 

const GetProductsDataForFeatures = async (featureIds) => {
	const productsData = await Product.find({"features.featureId": {$in: featureIds}})
	return productsData
}

module.exports = {
	GetAllProducts,
	GetProductsDataForFeatures
}