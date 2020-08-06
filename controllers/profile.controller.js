const db = require('../common/db')
const cloudinary = require('cloudinary').v2
const User = require('../model/user.model')

module.exports = {
    profile: async (req, res) => {
        res.render('profile/profile', {
            user: await User.findById(req.signedCookies.userId)
        })
    },
    update: async (req, res) => {
        res.render('profile/update', {
            user: await User.findById(req.signedCookies.userId)
        })
    },
    updatePost: async (req, res) => {
        if(req.file) {
            let result = await cloudinary.uploader.upload(req.file.path)
            req.body.avatarUrl = result.url
        }
        await User.updateOne({ _id: req.signedCookies.userId }, req.body)
        
        res.redirect('/profile')
    }
}