const express = require('express')
const route = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/shop.controller')
const validate = require('../middlewares/validate.middleware')

route.get('/', controller.shop)
route.get('/:idUser/books', controller.list)
route.get('/:idUser/books/create', controller.create)
route.get('/:idUser/books/:idBook', controller.info)
route.get('/:idUser/books/:idBook/update', controller.update)
route.get('/:idUser/books/:idBook/delete', controller.delete)

route.post('/:idUser', controller.createShop)
route.post('/:idUser/books/create', validate.checkBook, controller.createPost)
route.post('/:idUser/books/:idBook/update', upload.single('cover'), controller.updatePost)


module.exports = route