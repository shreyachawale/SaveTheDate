const Wedding = require('../models/WeddingDetails');
const jwt = require('jsonwebtoken');

// Ideally, use environment variables to store sensitive keys like the JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'MPRPROJECT';

// Create a new wedding (Protected Route)
module.exports.createWedding = async (req, res) => {
    const { name, date, location } = req.body;

    try {
        // Get the user from the JWT token
        const userId = req.user.id;

        // Create a new wedding with the host as the current user
        const newWedding = new Wedding({
            name,
            date,
            location,
            host: userId, // Assign the current user as the host
        });

        await newWedding.save();
        res.status(201).json(newWedding);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all weddings for a host (Protected Route)
module.exports.getWeddingsForHost = async (req, res) => {
    try {
        // Get the user from the JWT token
        const userId = req.user.id;

        // Find weddings where the current user is the host
        const weddings = await Wedding.find({ host: userId });
        if (!weddings.length) {
            return res.status(404).json({ msg: 'No weddings found' });
        }

        res.json(weddings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get wedding details by ID (Protected Route)
module.exports.getWeddingById = async (req, res) => {
    const { weddingId } = req.params;

    try {
        // Get the user from the JWT token
        const userId = req.user.id;

        // Find the wedding by ID and ensure the current user is the host
        const wedding = await Wedding.findOne({ _id: weddingId, host: userId });
        if (!wedding) {
            return res.status(404).json({ msg: 'Wedding not found' });
        }

        res.json(wedding);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update wedding details (Protected Route)
module.exports.updateWedding = async (req, res) => {
    const { weddingId } = req.params;
    const { name, date, location } = req.body;

    try {
        // Get the user from the JWT token
        const userId = req.user.id;

        // Find the wedding and ensure the current user is the host
        let wedding = await Wedding.findOne({ _id: weddingId, host: userId });
        if (!wedding) {
            return res.status(404).json({ msg: 'Wedding not found' });
        }

        // Update wedding details
        wedding.name = name || wedding.name;
        wedding.date = date || wedding.date;
        wedding.location = location || wedding.location;

        await wedding.save();
        res.json(wedding);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a wedding (Protected Route)
module.exports.deleteWedding = async (req, res) => {
    const { weddingId } = req.params;

    try {
        // Get the user from the JWT token
        const userId = req.user.id;

        // Find the wedding and ensure the current user is the host
        const wedding = await Wedding.findOne({ _id: weddingId, host: userId });
        if (!wedding) {
            return res.status(404).json({ msg: 'Wedding not found' });
        }

        await wedding.remove();
        res.json({ msg: 'Wedding removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
