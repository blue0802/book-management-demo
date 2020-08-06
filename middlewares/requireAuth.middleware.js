const db = require('../common/db')
const User = require('../model/user.model')

module.exports = {
    login: async (req, res, next) => {
        let userId = req.signedCookies.userId
        if(userId) {
            // res.locals.user = db.get('users')
            //                     .find({ "id": userId })
            //                     .value()
            res.locals.user = await User.findById(userId)
            res.locals.userId = true

            next()
        } else {
            res.redirect('/auth/login')
        }
        
    }
}