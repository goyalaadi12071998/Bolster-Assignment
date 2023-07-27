const Product = require('../models/products')
const { FindAll } = require('../providers/db/queries')

const GetAllProducts = async (filter) => {
	return await FindAll(Product, filter)
} 

module.exports = {
	GetAllProducts
}