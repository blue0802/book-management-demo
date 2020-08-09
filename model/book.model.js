const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    coverUrl: String,
    shopId: String
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book