const express = require('express');
const router = express.Router();
const userController = require('../controllers/AuthControllers');

// Register a new User
router.post('/register', userController.register);

// Login User
router.post('/login', userController.login);

// Protected route example
router.get('/protected', userController.verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

// Update User's Wedding ID
router.put('/users/wedding', userController.verifyToken, userController.updateWedding);

// Fetch User Details by ID (NEW GET API)
router.get('/:id', userController.getUserById);

module.exports = router;
