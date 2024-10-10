// hostAuth.js (Host-specific Authentication Middleware)
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MPRPROJECT';

module.exports = function (req, res, next) {
    // Get token from Authorization header
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach host info to the request object
        req.host = decoded; // assuming you're signing the token with { id: host._id }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
