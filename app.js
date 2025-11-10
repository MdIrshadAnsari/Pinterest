const express = require('express')
const app = express()
const path = require('path')
const indexrouter = require('./routes/index')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set(express.static(path.join(__dirname, 'public')))

app.use('/', indexrouter)

app.listen(3000)