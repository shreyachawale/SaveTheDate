const express = require('express');
const router = express.Router();
const Host = require('../models/Host');

// Register Host
router.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body;

  // Validate input fields
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if the host already exists
    const existingHost = await Host.findOne({ email });
    if (existingHost) {
      return res.status(400).json({ message: 'Host already exists' });
    }

    // Create a new host
    const newHost = new Host({ name, phone, email, password });
    await newHost.save();

    res.status(201).json({ message: 'Host registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Host
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if the host exists
    const host = await Host.findOne({ email });
    if (!host || host.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', host });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
