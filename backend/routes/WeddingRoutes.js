// backend/routes/WeddingRoutes.js

const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/WeddingControllers');
const authMiddleware = require('../middleware/AuthMiddleware'); // Ensure this middleware exists and is correctly exported

// Create a new wedding (user must be authenticated)
router.post('/',  weddingController.createWedding);

// Get all weddings for the authenticated user
router.get('/',  weddingController.getUserWeddings);

// Get a specific wedding by ID
router.get('/:id',  weddingController.getWeddingById);

// Update a specific wedding by ID
router.put('/:id',  weddingController.updateWedding);

// Delete a specific wedding by ID
router.delete('/:id', weddingController.deleteWedding);

module.exports = router;
