// const db = require('../common/db')
const User = require('../model/user.model')

module.exports = {
    list: async (req, res) => {
        let users = await User.find()
        res.render('users/list', {
            // users: db.get('users').value()
            users: users
        });
    },
    idRoute: async (req, res) => {
        // let user = db.get('users')
        //              .find({ "id": req.params.id })
        //              .value()

        let user = await User.findById(req.params.id)
        res.render('users/info', {
            acc: user
        })
    },
    removeUser: async (req, res) => {
        // db.get('users')
        //   .remove({ "id":  req.params.id})
        //   .write()
        await User.deleteOne({ _id:  req.params.id})

        res.redirect('/users')
    }
}