if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connected to DB'))
// app.use(express.json())

//const homeRouter = require('./routes/home')
//app.use('/', homeRouter)
const indexRouter = require('./routes/index')
const contactRouter = require('./routes/contact')

app.use('/', indexRouter)
app.use('/contact', contactRouter)

app.listen(process.env.PORT || 3000)