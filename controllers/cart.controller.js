const Session = require('../model/session.model')
const Book = require('../model/book.model')

module.exports = {
    addToCart: async (req, res) => {
        let sessionId = req.signedCookies.sessionId
        let bookId = req.params.id
        
        if(!sessionId) {
            res.redirect('/books')
            return
        }
        let session = await Session.findById(sessionId)
        
        if(session.cart !== null) {
          let book = session.cart
          if(book[bookId]) {
            book[bookId] = book[bookId] + 1
          } else {
            book[bookId] = 1
          }
          await Session.updateOne({ _id: sessionId }, { cart: book})
        } else {
          let book = {};
          book[bookId] = 1
          await Session.updateOne({ _id: sessionId }, { cart: book})
        }
        session = await Session.findById(sessionId)
        console.log(session.cart)

        let total = 0;
        for(item in session.cart) {
          total += session.cart[item]
        }
        await Session.updateOne({ _id: sessionId }, { total: total })
  
        res.redirect('/books')
    }
}