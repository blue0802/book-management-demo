const User = require('../model/user.model')

module.exports = {
    login: async (req, res, next) => {
        let userId = req.signedCookies.userId
        if(userId) {
            res.locals.user = await User.findById(userId)

            next()
        } else {
            res.redirect('/auth/login')
        }
        
    }
}