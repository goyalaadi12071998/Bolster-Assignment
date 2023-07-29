const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const {isLoggedIn} = require('./middlewares/session-middleware')

router.post('/login', controllers.UserController.LoginUser)
router.get('/profile', isLoggedIn, controllers.UserController.GetProfileData)
router.get('/list-products', controllers.ProductController.ListAllProducts)
router.get('/my-products', isLoggedIn, controllers.ProductController.FetchUserProducts)
router.post('/refresh-token', controllers.UserController.RefreshToken)
router.get('/analytics', isLoggedIn, controllers.ChartController.GetChartsForUser)
router.get('/logout', controllers.UserController.Logout)

module.exports = router
