const express = require('express');
const guestController = require('../controllers/AuthControllers');
const router = express.Router();

// Create a new guest
router.post('/', guestController.createGuest);

// Get all guests
router.get('/', guestController.getAllGuests);

// Get a guest by ID
router.get('/:id', guestController.getGuestById);

// Update a guest by ID
router.put('/:id', guestController.updateGuestById);

// Delete a guest by ID
router.delete('/:id', guestController.deleteGuestById);

module.exports = router;
