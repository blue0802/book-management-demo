const express = require('express')
const multer  = require('multer')


const route = express.Router()

const upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/profile.controller')

route.get('/', controller.profile)

route.get('/update', controller.update)

route.post('/update', upload.single('avatar'), controller.updatePost)

module.exports = route