const mongoose = require('mongoose');

// Event schema for each day's events
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  music: { type: String, default: 'no' },
  dressCode: { type: String }
});

// Wedding schema including the user reference
const weddingSchema = new mongoose.Schema({
  groomName: { type: String, required: true },
  brideName: { type: String, required: true },
  tickets: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  preWeddingImages: { type: [String], required: false },
  ourStory: { type: String, required: true },
  languages: { type: String },
  menu: { type: String, enum: ['veg', 'non-veg', 'jain'], default: 'veg' },
  alcohol: { type: String, enum: ['yes', 'no'], default: 'no' },
  transportation: { type: String, default: 'not included' },
  accommodation: { type: String, default: 'not included' },
  day1: { type: eventSchema, required: true },
  day2: { type: eventSchema, required: true },

  // Adding reference to the User model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Wedding', weddingSchema);
