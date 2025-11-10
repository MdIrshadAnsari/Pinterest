const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(`${config.get('DATABASE_URI')}/pinterest`)
.then(function(){
    console.log("DB Connected")
})
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection