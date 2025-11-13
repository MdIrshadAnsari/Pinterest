const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email : String,
    number : Number,
    password : String,
    profilepicture: String,
    posts:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "postmodel"
        }
    ]
})
module.exports = mongoose.model("usermodel", userSchema)