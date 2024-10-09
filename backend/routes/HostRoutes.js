const express = require('express');
const router = express.Router();
const { register, login, getHostDetails } = require('../controllers/HostController');
const authMiddleware = require('../middleware/HostMiddleware');

// @route   POST api/hosts/register
// @desc    Register a new host
// @access  Public
router.post('/register', register);

// @route   POST api/hosts/login
// @desc    Login a host and get token
// @access  Public
router.post('/login', login);

// @route   GET api/hosts/me
// @desc    Get logged-in host details
// @access  Private
router.get('/me', authMiddleware, getHostDetails);

module.exports = router;
