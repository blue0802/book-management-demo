const express = require('express')
const route = express.Router()

const controller = require('../controllers/transaction.controller')

route.get('/', controller.list)
route.get('/:id/rent', controller.rent)
route.get('/rents', controller.rentAll)

route.get('/:id/complete', controller.complete)
route.get('/:id/incomplete', controller.incomplete)

module.exports = route  