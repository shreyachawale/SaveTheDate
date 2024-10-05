const mongoose = require('mongoose');
require('dotenv').config()

const Url=process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(Url);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
