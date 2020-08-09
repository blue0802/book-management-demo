const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    account: String,
    book: String,
    shopId: String,
    isComplete: Boolean
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction