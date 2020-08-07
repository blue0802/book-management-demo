const User = require('../model/user.model')

module.exports = {
    list: async (req, res) => {
        let users = await User.find()
        res.render('users/list', {
            users: users
        });
    },
    idRoute: async (req, res) => {
        let user = await User.findById(req.params.id)
        res.render('users/info', {
            acc: user
        })
    },
    removeUser: async (req, res) => {
        await User.deleteOne({ _id:  req.params.id})

        res.redirect('/users')
    }
}