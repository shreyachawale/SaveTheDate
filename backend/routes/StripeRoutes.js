const express = require('express');
const router = express.Router();
const Wedding = require("../models/WeddingDetails")
require('dotenv').config()


const payment = process.env.STRIPE_SECRET_KEY
console.log(payment)

const stripe = require('stripe')(payment); // Use your Stripe secret key

router.post('/create-checkout-session', async (req, res) => {
  const { weddingId, userId } = req.body;

  // Lookup the wedding details from your database here
  const wedding = await Wedding.findById(weddingId);
  if (!wedding) {
    return res.status(404).json({ message: 'Wedding not found' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${wedding.groomName} & ${wedding.brideName}'s Wedding`,
              description: `Ticket to the wedding on ${new Date(wedding.day2.date).toLocaleDateString()}`,
            },
            unit_amount: wedding.ticketPrice * 100, // Stripe requires the amount in paise (1 INR = 100 paise)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
