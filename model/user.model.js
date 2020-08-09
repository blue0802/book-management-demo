const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    avatarUrl: String,
    isAdmin: Boolean,
    shopId: String
})

const User = mongoose.model('User', userSchema)

module.exports = User