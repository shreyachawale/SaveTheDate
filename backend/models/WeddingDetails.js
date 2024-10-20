const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  groomName: { type: String, required: true },
  brideName: { type: String, required: true },
  tickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  preWeddingImages: [{ type: String }], // Array of image URLs or paths
  ourStory: { type: String, required: true },
  languages: [{ type: String }], // Changed to array of strings
  menu: {type: String},
  appetizers: [{ type: String }],
  mainCourse: [{ type: String }],
  desserts: [{ type: String }],
// Changed to an object with arrays
  alcohol: { type: String,  default: 'Not Included' }, // Ensure to pass "yes" or "no"
  transportation:{ type: String,  default: 'Not Included' }, // Changed to an object
  accommodation: { type: String,  default: 'Not Included' }, // Changed to an object
  
  day1: {
    eventName: { type: String },
    place: { type: String },
    date: { type: Date },
    description: { type: String },
    music: { type: String,  default: 'no' },
    dressCode: { type: String },
    time: { type: String },
  },
  
  day2: {
    eventName: { type: String },
    place: { type: String },
    date: { type: Date },
    description: { type: String },
    music: { type: String, default: 'no' },
    dressCode: { type: String },
    time: { type: String },
  },
  
  hosts: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' }, // One-to-many with hosts
  guests: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
   }], // Many-to-many with guests
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Wedding = mongoose.model('Wedding', weddingSchema);
module.exports = Wedding;
