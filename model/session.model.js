const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    cart: Object,
    total: Number
})

const Session = new mongoose.model('Session', sessionSchema)

module.exports = Session