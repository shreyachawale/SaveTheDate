// guestAuth.js (Guest-specific Authentication Middleware)
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MPRPROJECT';  // Ensure this matches your JWT secret

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach guest info to the request object
        req.guest = decoded.user; // assuming you're signing the token with { guest: { id: guest.id } }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
