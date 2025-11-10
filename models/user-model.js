const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email : String,
    number : Number,
    password : String,
})
module.exports = mongoose.model("usermodel", userSchema)