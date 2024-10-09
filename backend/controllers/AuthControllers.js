const Guest = require('../models/User');

// Create a new guest
module.exports.createGuest = async (req, res) => {
    const { name, email, phone, weddings } = req.body;

    try {
        const guest = new Guest({
            name,
            email,
            phone,
            weddings,
        });

        await guest.save();
        res.status(201).json(guest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all guests
module.exports.getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.find().populate('weddings'); // Populate wedding details if needed
        res.json(guests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get a guest by ID
module.exports.getGuestById = async (req, res) => {
    const { id } = req.params;

    try {
        const guest = await Guest.findById(id).populate('weddings'); // Populate wedding details if needed
        if (!guest) {
            return res.status(404).json({ msg: 'Guest not found' });
        }
        res.json(guest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update a guest by ID
module.exports.updateGuestById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, weddings } = req.body;

    try {
        const guest = await Guest.findByIdAndUpdate(
            id,
            { name, email, phone, weddings },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!guest) {
            return res.status(404).json({ msg: 'Guest not found' });
        }
        res.json(guest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a guest by ID
module.exports.deleteGuestById = async (req, res) => {
    const { id } = req.params;

    try {
        const guest = await Guest.findByIdAndDelete(id);
        if (!guest) {
            return res.status(404).json({ msg: 'Guest not found' });
        }
        res.json({ msg: 'Guest deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
