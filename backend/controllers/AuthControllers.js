const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT (store securely)
const JWT_SECRET = 'MPRPROJECT';

// Register User
module.exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Login User
module.exports.login = async (req, res) =>{


    try {
    const { email, password } = req.body;

  
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } 

    catch(err){
        console.log("catch these nuts:")
    }
};

// Verify token middleware
module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

// Update User's Wedding ID
module.exports.updateWedding = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the verified token
    const { weddingId } = req.body; // Expecting { weddingId: 'wedding_id_here' }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the weddings field
        user.weddings.push(weddingId); // Assuming weddings is an array
        await user.save();

        return res.status(200).json({ message: 'Wedding ID updated successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
