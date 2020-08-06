const express = require('express')
const route = express.Router()

const controller = require('../controllers/cart.controller')

route.get('/add/:id', controller.addToCart)

module.exports = route