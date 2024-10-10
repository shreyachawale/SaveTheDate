const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  groomName: { type: String, required: true },
  brideName: { type: String, required: true },
  tickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  preWeddingImages: [{ type: String }], // Array of image URLs or paths
  ourStory: { type: String, required: true },
  languages: [{ type: String }], // Changed to array of strings
  menu: {
    appetizers: [{ type: String }],
    mainCourse: [{ type: String }],
    desserts: [{ type: String }]
  }, // Changed to an object with arrays
  alcohol: { type: String, enum: ['yes', 'no'], default: 'no' }, // Ensure to pass "yes" or "no"
  transportation: {
    type: { type: String },
    provider: { type: String }
  }, // Changed to an object
  accommodation: {
    hotelName: { type: String },
    address: { type: String },
    phone: { type: String }
  }, // Changed to an object
  
  day1: {
    eventName: { type: String },
    place: { type: String },
    date: { type: Date },
    description: { type: String },
    music: { type: String, enum: ['yes', 'no'], default: 'no' },
    dressCode: { type: String },
    time: { type: String },
  },
  
  day2: {
    eventName: { type: String },
    place: { type: String },
    date: { type: Date },
    description: { type: String },
    music: { type: String, enum: ['yes', 'no'], default: 'no' },
    dressCode: { type: String },
    time: { type: String },
  },
  
  hosts: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' }, // One-to-many with hosts
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Many-to-many with guests
}, { timestamps: true });

const Wedding = mongoose.model('Wedding', weddingSchema);
module.exports = Wedding;
