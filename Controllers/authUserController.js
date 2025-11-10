const usermodel = require('../models/user-model')
const {decrptyPass} = require('../utils/decryptpass')
const {hashPass} = require('../utils/encryptPass')
const {jsontoken} = require('../utils/generateToken')

const registeruser = async(req, res)=>{
    try {
        let{username, email, number, password } = req.body;
        let ifuser = await usermodel.findOne({email : email})
     if(ifuser) {
      res.send("This email is already registered")
      res.redirect('/')
}
        const hashedpass = await hashPass(password)
        let user = await usermodel.create({
            username,
            email,
            number,
            password: hashedpass
        })
        const token = jsontoken(user)
        res.cookie("token", token)
        // res.send("Account created Successfully")
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {registeruser}