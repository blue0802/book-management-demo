const bcrypt = require('bcrypt')
const Book = require('../model/book.model')
const User = require('../model/user.model')

const saltRound = 10;

let count = 0;

module.exports = {
    login: async (req, res, next) => {
        let account = await User.findOne({ username: req.body.username })                    

        if(!account) {
            res.render('auth/login', {
                err: "Account does not exist!",
                value: req.body
            })
            return;
        }

        let match = await bcrypt.compare(req.body.password, account.password)

        if (!match) {
            res.render('auth/login', {
                err: "Password wrong!",
                value: req.body
            })
        } else {
            next()
        }
    },
    signup: async (req, res, next) => {
        let hasEmail = await User.findOne({ email: req.body.email })
                         
        let hasUsername = await User.findOne({ username: req.body.username })
    
        if(hasEmail) {
            res.render('auth/signup', {
                err: "Email da duoc su dung!",
                value: req.body
            })
        } else if (hasUsername) {
            res.render('auth/signup', {
                err: "Username da duoc su dung!",
                value: req.body
            })
        } else {
            next()
        }
    },
    checkBook: async (req, res, next) => {
        // let hasBook = db.get('books')
        //                 .find({ "title": req.body.title })
        //                 .value()
        let hasBook = await Book.find({ title: req.body.title })
        if(hasBook.length) {
            res.render('books/create', {
                err: "The book's title is exist!",
                value: req.body
            })
        } else {
            next()
        }
    }
}