const mongoose=require('mongoose')

const hostSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: false, 
        unique: true, 
      }, 
      phone: { 
        type: String, 
        required: false, 
        unique: true, 
      }, 
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
})

module.exports =mongoose.model('Host',hostSchema)