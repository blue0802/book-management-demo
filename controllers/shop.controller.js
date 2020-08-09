const cloudinary = require('cloudinary').v2
const shortId = require("shortid")

const Book = require('../model/book.model')
const User = require('../model/user.model')
const shortid = require('shortid')

module.exports = {
    shop: (req, res) => {
        res.render('shops/shop')
    },
    createShop: async (req, res) => {
        await User.updateOne({ _id: req.params.idUser }, { shopId: shortid.generate() })

        res.redirect('/shops')
    },
    list: async (req, res) => {
        let user = await User.findById(req.signedCookies.userId)
        let books = await Book.find({ shopId: user.shopId })
        
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
        let book = await Book.findById(req.params.idBook)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/info', {
            book: book,
            user: user
        })
    },
    update: async (req, res) => {
        let book = await Book.findById(req.params.idBook)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/update', {
            value: book,
            user: user
        })
    },
    delete: async (req, res) => {
        await Book.deleteOne({ _id: req.params.idBook })
        
        res.redirect('/shops/' + req.params.idUser + '/books')
    },
    createPost: async (req, res) => {
        req.body.coverUrl = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105'
       
        let book = new Book(req.body)
        let user = await User.findById(req.params.idUser)
        book.shopId = user.shopId
        book.save()

        res.redirect('/shops/' + req.params.idUser + '/books')
    },
    updatePost: async (req, res) => {
        if(req.file) {
            let result = await cloudinary.uploader.upload(req.file.path)
            req.body.coverUrl = result.url
        }
        await Book.updateOne({ _id: req.params.idBook }, req.body)
        
        res.redirect('/shops/' + req.params.idUser + '/books') 
    }
}