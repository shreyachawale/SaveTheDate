const express = require('express');
const weddingController = require('../controllers/WeddingControllers');
const router = express.Router();

// Create a new wedding
router.post('/create', weddingController.createWedding);

// Get all weddings
router.get('/all', weddingController.getAllWeddings);

// Get a wedding by ID
router.get('/:id', weddingController.getWeddingById);

// Delete a wedding by ID
router.delete('/:id', weddingController.deleteWeddingById);

module.exports = router;
