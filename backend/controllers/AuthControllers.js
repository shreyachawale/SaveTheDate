const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key (ideally stored in environment variables)
const JWT_SECRET = 'MPRPROJECT';

// Register a new host
module.exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
        // Check if the host already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new host
        user = new User({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user._email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get host details (Protected Route)
module.exports.getUserDetails = async (req, res) => {
    try {
        const host = await Host.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
