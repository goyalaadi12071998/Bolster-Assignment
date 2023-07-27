const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const {isLoggedIn} = require('./middlewares/session-middleware')

router.post('/login', controllers.UserController.LoginUser)
router.get('/list-products', isLoggedIn, controllers.ProductController.ListAllProducts)
router.get('/refresh-token', controllers.UserController.RefreshToken)

module.exports = router
