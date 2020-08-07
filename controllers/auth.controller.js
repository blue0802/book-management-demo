const shortid = require('shortid')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../model/user.model')

const saltRound = 10;

module.exports = {
    login: async (req, res) => {
        let user = await User.findById(req.signedCookies.userId)
        res.render('auth/login', {
            user: user
        })
    },
    loginPost: async (req, res) => {
        let user = await User.findOne({ "username": req.body.username})
        res.cookie('userId', user._id, {
            signed: true
        })        
        res.redirect('/')
    }, 
    signup: (req, res) => {
        res.render('auth/signup')
    },
    signupPost: async (req, res) => {
        req.body.avatarUrl = 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png'
        bcrypt.hash(req.body.password, saltRound)
            .then(hash => {
                req.body.password = hash
                let user = new User(req.body)
                user.save()
                            
                res.redirect('/auth/login')
            })
    },
    logout: (req, res) => {
        res.send()
    },
    logoutPost: (req, res) => {
        res.clearCookie('userId')
        res.clearCookie('sessionId')
        res.redirect('/auth/login')
    }
}