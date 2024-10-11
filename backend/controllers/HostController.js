const Host = require('../models/Host'); // Import Host model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT (store securely)
const JWT_SECRET = 'MPRPROJECT'; 

// Register Host
module.exports.register = async (req, res) => {
    const { name, phone, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingHost = await Host.findOne({ email });
        if (existingHost) {
            return res.status(400).json({ message: 'Host already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new host
        const newHost = new Host({ name, phone, email, password: hashedPassword });
        await newHost.save();

        // Generate JWT token
        const token = jwt.sign({ id: newHost._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'Host registered successfully', token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Login Host
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the host by email
        const host = await Host.findOne({ email });
        if (!host) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, host.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: host._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token, host: { id: host._id, name: host.name, email: host.email } });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Verify token middleware
module.exports.verifyToken = (req, res, next) => {
    try{
    
    
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer TOKEN'

    if (!token) {
        
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.host = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}catch(error){
    console.log("hello fron rutime error")

}
};
