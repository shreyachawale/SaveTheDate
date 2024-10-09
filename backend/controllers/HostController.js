const Host = require('../models/Host');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key (ideally stored in environment variables)
const JWT_SECRET = 'MPRPROJECT';

// Register a new host
module.exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
        // Check if the host already exists
        let host = await Host.findOne({ email });
        if (host) {
            return res.status(400).json({ msg: 'Host already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new host
        host = new Host({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        await host.save();

        // Generate JWT
        const token = jwt.sign({ id: host._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login a host
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if host exists
        const host = await Host.findOne({ email });
        if (!host) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, host.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: host._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get host details (Protected Route)
module.exports.getHostDetails = async (req, res) => {
    try {
        const host = await Host.findById(req.host.id).select('-password');
        res.json(host);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
