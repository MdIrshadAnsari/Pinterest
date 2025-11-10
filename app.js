const express = require('express')
const app = express()
const path = require('path')
const indexrouter = require('./routes/index')
const cookieParser = require('cookie-parser')
const db = require('./config/database-connection')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', indexrouter)

app.listen(3000)
