const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});


const authRoute = require('./routes/auth.route')
const usersRoute = require('./routes/user.route')
const booksRoute = require('./routes/book.route')
const transactionsRoute = require('./routes/transaction.route')
const profileRoute = require('./routes/profile.route')
const cartRoute = require('./routes/cart.route')

const requireAuth = require('./middlewares/requireAuth.middleware')
const session = require('./middlewares/session.middleware')

const User = require('./model/user.model')

const app = express()

const port = process.env.port || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static('public'))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session)

app.use('/auth', authRoute)
app.use('/users', requireAuth.login, usersRoute)
app.use('/books', booksRoute)
app.use('/transactions', requireAuth.login, transactionsRoute)
app.use('/profile', profileRoute)
app.use('/cart', cartRoute)

app.get('/', async (req, res) => {
    res.render('index', {
        user: await User.findById(req.signedCookies.userId)
    });
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})