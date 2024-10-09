const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    default: "guest",
    required: false,
  }
  // Add a reference to the Wedding model

});


module.exports = mongoose.model('User', userSchema);
