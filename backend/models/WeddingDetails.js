const mongoose = require('mongoose');

const DayEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: false
  },
  place: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  music: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  dressCode: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
});

const WeddingSchema = new mongoose.Schema({
  groomName: {
    type: String,
    required: true,
    trim: true
  },
  brideName: {
    type: String,
    required: true,
    trim: true
  },
  tickets: {
    type: Number,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  preWeddingImages: {
    type: [String],  // Array to store multiple images
    default: []
  },
  ourStory: {
    type: String,
    required: true
  },
  languages: {
    type: String,  // Single string input for languages
    required: false
  },
  menu: {
    type: String,
    enum: ['veg', 'non-veg', 'jain'],  // Limited options for the menu
    default: 'veg'
  },
  alcohol: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  transportation: {
    type: String,
    enum: ['included', 'not included'],
    default: 'not included'
  },
  accommodation: {
    type: String,
    enum: ['included', 'not included'],
    default: 'not included'
  },
  day1: {
    type: DayEventSchema,  // Nested schema for day 1 details
    required: false
  },
  day2: {
    type: DayEventSchema,  // Nested schema for day 2 details
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming 'User' is the host model
    required: true
  }
});

// Creating the 'Wedding' model
const Wedding = mongoose.model('Wedding', WeddingSchema);

module.exports = Wedding;
