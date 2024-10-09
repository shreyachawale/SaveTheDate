// Wedding.js (Model)
const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  groomName: { type: String, required: true },
  brideName: { type: String, required: true },
  tickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  preWeddingImages: [{ type: String }], // Array of image URLs or paths
  ourStory: { type: String, required: true },
  languages: { type: String },
  menu: { type: String, enum: ['veg', 'non-veg', 'jain'], default: 'veg' },
  alcohol: { type: String, enum: ['yes', 'no'], default: 'no' },
  transportation: { type: String, enum: ['included', 'not included'], default: 'not included' },
  accommodation: { type: String, enum: ['included', 'not included'], default: 'not included' },
  
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
  
  hosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Host' }], // Many-to-many with hosts
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guest' }], // Many-to-many with guests
}, { timestamps: true });

const Wedding = mongoose.model('Wedding', weddingSchema);
module.exports = Wedding;
