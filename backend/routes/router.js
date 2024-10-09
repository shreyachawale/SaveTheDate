const express = require('express');
const { register, login } = require('../controllers/AuthControllers');
const { checkuser } = require('../middleware/AuthMiddleware');
require('dotenv').config();

const payment = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(payment); // Replace with your actual secret key

const router = express.Router();

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { weddings } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: weddings.map((wedding) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: wedding.name, // Update as per your item structure
          },
          unit_amount: wedding.price * 100, // Convert to cents
        },
        quantity: wedding.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/successful', // Update as needed
      cancel_url: 'http://localhost:3000/', // Update as needed
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Register and login routes
router.post('/register', register); // Register a new user
router.post('/login', login); // Login an existing user

// Example of a protected route
router.get('/user', checkuser, (req, res) => {
  // Assuming you have a function to get user details
  res.json({ message: 'User details here' });
});

module.exports = router;
