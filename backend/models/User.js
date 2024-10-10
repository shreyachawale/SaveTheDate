// User.js (Model)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password:{type:String, required:true},
  
  weddings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedding' }], // Many-to-many relation: guests attending multiple weddings
}, { timestamps: true });

const Guest = mongoose.model('User', userSchema);
module.exports = Guest;
