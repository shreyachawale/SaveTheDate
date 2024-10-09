const jwt = require('jsonwebtoken');

// Ideally, use environment variables to store sensitive keys like the JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'MPRPROJECT';

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token'); // Assuming you're sending the token in the header

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user information to the request object
        next(); // Proceed to the next middleware/controller
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
