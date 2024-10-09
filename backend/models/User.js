// Guest.js (Model)
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  
  weddings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wedding' }], // Many-to-many relation: guests attending multiple weddings
}, { timestamps: true });

const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;
