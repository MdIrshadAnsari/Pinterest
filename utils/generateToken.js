const jwt = require('jsonwebtoken')

const token = (user)=>{
    return jwt.sign({email : user.email, id: user._id}, 'irshad')
}

module.exports.jsontoken = token