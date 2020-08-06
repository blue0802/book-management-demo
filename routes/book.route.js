const express = require('express')
const route = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/book.controller')
const validate = require('../middlewares/validate.middleware')

route.get('/', controller.list)
route.get('/create', controller.create)
route.get('/:id', controller.info)
route.get('/:id/update', controller.update)
route.get('/:id/delete', controller.delete)

route.post('/create', validate.checkBook, controller.createPost)
route.post('/:id/update', upload.single('cover'), controller.updatePost)


module.exports = route