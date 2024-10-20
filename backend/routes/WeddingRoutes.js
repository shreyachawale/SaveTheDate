const express = require('express');
const router = express.Router();
const weddingController = require('../controllers/WeddingControllers');
const hostController = require('../controllers/HostController'); // Include your authentication middleware
const Wedding = require('../models/WeddingDetails');


// Create a new wedding (protected)
router.post('/create', weddingController.createWedding);

// Get all weddings (public)
router.get('/', weddingController.getWeddings);

// Get wedding by ID
router.get('/:id', weddingController.getWeddingById);

// Update wedding (protected)
router.patch('/:id', async (req, res) => {
    const { id } = req.params; // Wedding ID from the URL
    const { userId } = req.body; // userId from the request body
    console.log(id)
    console.log(userId)
  
    try {
      const updatedWedding = await Wedding.findByIdAndUpdate(
        id,
        { $addToSet: { guests: userId } }, // Add userId to guests array without duplicates
        { new: true } // Return the updated document
      );
  
      if (!updatedWedding) {
        return res.status(404).json({ message: 'Wedding not found.' });
      }
  
      res.status(200).json({ message: 'Guest added successfully!', data: updatedWedding });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

// Delete wedding (protected)
router.delete('/:id', hostController.verifyToken, weddingController.deleteWedding);

router.post('/:weddingId/request', weddingController.requestAccessToWedding);

// Route to approve a request
router.post('/:weddingId/approve', weddingController.approveRequest);

module.exports = router;
