const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
const validate = require('../middlewares/validate.middleware')

route.get('/login', controller.login)

route.post('/login', validate.login, controller.loginPost)

route.get('/signup', validate.signup, controller.signup)

route.post('/signup', controller.signupPost)

route.get('/logout', controller.logout)

route.post('/logout', controller.logoutPost)

module.exports = route