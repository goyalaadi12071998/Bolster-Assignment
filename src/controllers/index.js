const userControllers = require('./user-controller')
const productControllers = require('./product-controller')
const chartControllers = require('./chart-controller')

const controllers = {
    UserController: userControllers,
    ProductController: productControllers,
    ChartController: chartControllers
}

module.exports = controllers