const shortid = require('shortid')
const cloudinary = require('cloudinary').v2
const Book = require('../model/book.model')
const User = require('../model/user.model')

module.exports = {
    list: async (req, res) => {
        let books = await Book.find()
        let user = await User.findById(req.signedCookies.userId)
        
        res.render('books/list', {
            books: books,
            user: user
        })
    },
    create: async (req, res) => {
        let user = await User.findById(req.signedCookies.userId)
        res.render('books/create', {
            user: user
        })
    },
    info: async (req, res) => {
        let book = await Book.findById(req.params.id)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/info', {
            book: book,
            user: user
        })
    },
    update: async (req, res) => {
        let book = await Book.findById(req.params.id)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/update', {
            value: book,
            user: user
        })
    },
    delete: async (req, res) => {
        await Book.deleteOne({ _id: req.params.id })
        
        res.redirect('/books')
    },
    createPost: async (req, res) => {
        req.body.coverUrl = '/uploads/cover-default.png'
       
        let book = new Book(req.body)
        book.save()

        res.redirect('/books')
    },
    updatePost: async (req, res) => {
        if(req.file) {
            let result = await cloudinary.uploader.upload(req.file.path)
            req.body.coverUrl = result.url
        }
        await Book.updateOne({ _id: req.params.id }, req.body)
        
        res.redirect('/books/' + req.params.id) 
    }
}