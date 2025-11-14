const express = require('express')
const router = express.Router();
const {registeruser, loginuser, logoutuser, isLoggesin} = require('../Controllers/authUserController')
const upload = require('../config/multer-config');
const usermodel = require('../models/user-model');
const postmodel = require('../models/post-model')

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/home', isLoggesin, async(req, res)=>{
   const user = await usermodel.findOne({email: req.user.email})
   .populate('posts')
   //console.log(user)
    res.render('home', {user})
})

router.post('/fileupload',isLoggesin, upload.single('image'), async(req, res)=>{
     const user = await usermodel.findOne({email: req.user.email})
     user.profilepicture = req.file.filename
     await user.save()
    res.redirect('/home')
    // res.send('uploaded')

})

router.post('/createpost', isLoggesin, upload.single('postimage') , async(req, res)=>{
     const user = await usermodel.findOne({email: req.user.email})
    let{postimage, title, description} = req.body;
   const createdpost = await postmodel.create({
        user: user._id,
        title,
        description,
        postimage: req.file.filename
    })
  user.posts.push(createdpost._id)
  await user.save()
  res.redirect('/home')
})

router.get('/add', isLoggesin, async(req, res)=>{
    const user = await usermodel.findOne({email: req.user.email})
    res.render('add')
})

router.get('/show/posts', isLoggesin, async(req, res)=>{
    const user = await usermodel.findOne({email: req.user.email})
   .populate('posts')
    res.render('show', {user})
})

router.get('/feed', isLoggesin, async(req, res)=>{
  const user = usermodel.findOne({email: req.user.email})
 const posts = await postmodel.find()
  .populate("user")
  res.render('feed', {user, posts})
})

router.post('/register', registeruser)
router.post('/login', loginuser)
router.get('/logout', logoutuser)


module.exports = router