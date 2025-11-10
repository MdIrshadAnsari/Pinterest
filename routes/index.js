const express = require('express')
const router = express.Router();
const {registeruser} = require('../Controllers/authUserController')

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', registeruser)

module.exports = router