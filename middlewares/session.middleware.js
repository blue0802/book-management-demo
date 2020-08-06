const shortid = require('shortid')
const Session = require('../model/session.model')

module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        let session = new Session({cart: null, total: 0});
        session.save()
        res.cookie('sessionId', session._id, {
            signed: true
        })
    }
    res.locals.cart = await Session.findById(req.signedCookies.sessionId)
    
    next()
}