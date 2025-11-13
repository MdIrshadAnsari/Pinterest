const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"usermodel"
    },
    title: String,
    description:String,
    postimage: String,
})

module.exports = mongoose.model('postmodel', postschema)