const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/WeddingControllers');
const hostController = require('../controllers/HostController'); // Include your authentication middleware

// Create a new wedding (protected)
router.post('/create', weddingController.createWedding);

// Get all weddings (public)
router.get('/', weddingController.getWeddings);

// Get wedding by ID
router.get('/:id', weddingController.getWeddingById);

// Update wedding (protected)
router.put('/:id', hostController.verifyToken, weddingController.updateWedding);

// Delete wedding (protected)
router.delete('/:id', hostController.verifyToken, weddingController.deleteWedding);

module.exports = router;
