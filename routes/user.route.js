const express = require('express')
const route = express.Router()
const controller = require('../controllers/user.controller')

route.get('/', controller.list)

route.get('/:id', controller.idRoute)

route.get('/:id/delete', controller.removeUser)

module.exports = route;