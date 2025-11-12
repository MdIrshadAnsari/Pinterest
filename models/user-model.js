const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email : String,
    number : Number,
    password : String,
    profilepicture: String,
})
module.exports = mongoose.model("usermodel", userSchema)