const Wedding = require('../models/WeddingDetails');

// Create a new wedding
exports.createWedding = async (req, res) => {
  try {
    const weddingData = req.body;

    const wedding = new Wedding(weddingData);
    const savedWedding = await wedding.save();

    res.status(201).json({ message: "Wedding created successfully", wedding: savedWedding });
  } catch (error) {
    res.status(500).json({ message: "Error creating wedding", error: error.message });
  }
};

// Get all weddings
exports.getAllWeddings = async (req, res) => {
  try {
    const weddings = await Wedding.find();
    res.status(200).json(weddings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weddings", error: error.message });
  }
};

// Get a wedding by ID
exports.getWeddingById = async (req, res) => {
  try {
    const { id } = req.params;
    const wedding = await Wedding.findById(id);

    if (!wedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    res.status(200).json(wedding);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wedding", error: error.message });
  }
};

// Delete a wedding by ID
exports.deleteWeddingById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWedding = await Wedding.findByIdAndDelete(id);

    if (!deletedWedding) {
      return res.status(404).json({ message: "Wedding not found" });
    }

    res.status(200).json({ message: "Wedding deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wedding", error: error.message });
  }
};
