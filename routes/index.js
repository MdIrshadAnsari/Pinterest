const express = require('express')
const router = express.Router();
const {registeruser, loginuser, logoutuser, isLoggesin} = require('../Controllers/authUserController')
const upload = require('../config/multer-config');
const usermodel = require('../models/user-model');

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/home', isLoggesin, async(req, res)=>{
   const user = await usermodel.findOne({email: req.user.email})
    res.render('home', {user})
})

router.post('/fileupload',isLoggesin, upload.single('image'), async(req, res)=>{
     const user = await usermodel.findOne({email: req.user.email})
     user.profilepicture = req.file.filename
     await user.save()
    res.redirect('/home')
    // res.send('uploaded')

})

router.post('/register', registeruser)
router.post('/login', loginuser)
router.get('/logout', logoutuser)


module.exports = router