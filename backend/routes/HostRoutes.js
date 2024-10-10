const express = require('express');
const router = express.Router();
const authController = require('../controllers/HostController');

// Register a new Host
router.post('/register', authController.register);

// Login Host
router.post('/login', authController.login);

// Protected route example (you can add more routes)
router.get('/protected', authController.verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

module.exports = router;
