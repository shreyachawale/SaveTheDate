// backend/controllers/weddingController.js

const Wedding = require('../models/WeddingDetails');
const User = require('../models/User');

// Create a new wedding linked to a user
const createWedding = async (req, res) => {
  try {
    const { groomName, brideName, tickets, ticketPrice, ourStory, languages, menu, alcohol, transportation, accommodation, day1, day2 } = req.body;
    
    const userId = req.user._id; // Assuming user info is in req.user after authentication

    const wedding = new Wedding({
      groomName,
      brideName,
      tickets,
      ticketPrice,
      ourStory,
      languages,
      menu,
      alcohol,
      transportation,
      accommodation,
      day1,
      day2,
      user: userId
    });

    await wedding.save();
    res.status(201).json(wedding);
  } catch (error) {
    res.status(500).json({ message: 'Error creating wedding', error });
  }
};

// Get all weddings for a specific user
const getUserWeddings = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user info is in req.user after authentication

    const weddings = await Wedding.find({ user: userId }).populate('user', 'name email');
    res.status(200).json(weddings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weddings', error });
  }
};

// Get a single wedding by ID
const getWeddingById = async (req, res) => {
  try {
    const { id } = req.params;
    const wedding = await Wedding.findById(id).populate('user', 'name email');

    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found' });
    }

    res.status(200).json(wedding);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wedding', error });
  }
};

// Update a wedding by ID
const updateWedding = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id; // Assuming user info is in req.user after authentication

    // Find the wedding and ensure it belongs to the user
    const wedding = await Wedding.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updates },
      { new: true }
    );

    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found or not authorized' });
    }

    res.status(200).json(wedding);
  } catch (error) {
    res.status(500).json({ message: 'Error updating wedding', error });
  }
};

// Delete a wedding by ID
const deleteWedding = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Assuming user info is in req.user after authentication

    const wedding = await Wedding.findOneAndDelete({ _id: id, user: userId });

    if (!wedding) {
      return res.status(404).json({ message: 'Wedding not found or not authorized' });
    }

    res.status(200).json({ message: 'Wedding deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting wedding', error });
  }
};

// Export all controller functions
module.exports = {
  createWedding,
  getUserWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding
};
