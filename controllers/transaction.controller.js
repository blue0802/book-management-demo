const User = require('../model/user.model')
const Book = require('../model/book.model')
const Transaction = require('../model/transaction.model')
const Session = require('../model/session.model')

module.exports = {
    list: async (req, res) => {
        let transactions = await Transaction.find()
        res.render('transactions/list', {
            transactions: transactions 
        })
    },
    listOfShop: async (req, res) => {
        let user = await User.findById(req.params.idUser)
        let transactions = await Transaction.find({ shopId: user.shopId })
        res.render('transactions/list', {
            transactions: transactions 
        })
    },
    rent: async (req, res) => {
        let account = await User.findById(req.signedCookies.userId)
        let book = await Book.findById(req.params.id)

        let transaction = new Transaction({
            account: account.username,
            book: book.title,
            shopId: book.shopId,
            isComplete: false
        })
        transaction.save()

        res.redirect('/transactions')
    },
    complete: async (req, res) => {
        await Transaction.updateOne({ _id: req.params.id }, { isComplete: true })
        res.redirect('/transactions')
    },
    incomplete: async (req, res) => {
        await Transaction.updateOne({ _id: req.params.id }, { isComplete: false })

        res.redirect('/transactions')
    },
    rentAll: async (req, res) => {
        if(req.signedCookies.userId) {
            let session = await Session.findById(req.signedCookies.sessionId)
            let account = await User.findById(req.signedCookies.userId)

            for (const bookId in session.cart) {
                let book = await Book.findById(bookId)

                let transaction = new Transaction({
                    account: account.username,
                    book: book.title,
                    shopId: book.shopId,
                    isComplete: false
                })
                
                transaction.save()
            }
    
            res.redirect('/transactions')
        }
    }
}