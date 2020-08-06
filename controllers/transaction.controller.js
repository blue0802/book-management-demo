const db = require('../common/db')
const shortid = require('shortid')
const User = require('../model/user.model')
const Book = require('../model/book.model')
const Transaction = require('../model/transaction.model')
const Session = require('../model/session.model')

module.exports = {
    list: async (req, res) => {
        // res.render('transactions/list', {
        //     transactions: db.get('transactions')
        //                    .value()
        // })
        let transactions = await Transaction.find()
        res.render('transactions/list', {
            transactions: transactions 
        })
    },
    rent: async (req, res) => {
        // let account = db.get('users')
        //                .find({ "id": req.signedCookies.userId })
        //                .value()
        // let book = db.get('books')
        //              .find({ "id": req.params.id })
        //              .value()
        let account = User.findById({ _id: req.signedCookies.userId })
        let book = Book.findById({ _id: req.params.id })

        let transaction = new Transaction({
            // id: shortid.generate(),
            account: account.username,
            book: book.title,
            isComplete: false
        })
        transaction.save()

        res.redirect('/transactions')
    },
    complete: async (req, res) => {
        // db.get('transactions')
        //   .find({ "id": req.params.id })
        //   .assign({ "isComplete": true })
        //   .write()
        await Transaction.updateOne({ _id: req.params.id }, { isComplete: true })
        res.redirect('/transactions')
    },
    incomplete: async (req, res) => {
        // db.get('transactions')
        //   .find({ "id": req.params.id })
        //   .assign({ "isComplete": false })
        //   .write()
        await Transaction.updateOne({ _id: req.params.id }, { isComplete: false })

        res.redirect('/transactions')
    },
    rentAll: async (req, res) => {
        if(req.signedCookies.userId) {
            // let session = db.get('session')
            //                 .find({ id: req.signedCookies.sessionId })
            //                 .value()

            // let account = db.get('users')
            //                 .find({ id: req.signedCookies.userId })
            //                 .value()

            let session = await Session.findById(req.signedCookies.sessionId)
            let account = await User.findById(req.signedCookies.userId)

            for (const bookId in session.cart) {
                // let book = db.get('books')
                //                  .find({ id: bookId })
                //                  .value()
                let book = await Book.findById(bookId)

                let transaction = new Transaction({
                    // id: shortid.generate(),
                    account: account.username,
                    book: book.title,
                    isComplete: false
                })
                
                // db.get('transactions')
                //   .push(transaction)
                //   .write()
                transaction.save()
            }
    
            res.redirect('/transactions')
        }
    }
}