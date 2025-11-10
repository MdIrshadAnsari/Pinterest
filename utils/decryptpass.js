const bcrypt = require('bcrypt')

const decrptyPass = async(pass, hash)=>{
    try {
        const status = await bcrypt.compare(pass, hash)
        return status
    } catch (err) {
       res.send(err.message)
    }
}

module.exports = decrptyPass;