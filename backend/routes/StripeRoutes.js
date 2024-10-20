const express = require('express');
const router = express.Router();
const Wedding = require("../models/WeddingDetails");
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

router.post('/create-checkout-session', async (req, res) => {
  const { weddingId, userId } = req.body;

  // Lookup the wedding details from your database
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
            unit_amount: wedding.ticketPrice * 100, // Stripe requires the amount in paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success?weddingId=${weddingId}&userId=${userId}`, // Success URL
      cancel_url: 'http://localhost:3000/cancel', // Cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Route to update payment status after successful payment
router.post('/update-payment-status', async (req, res) => {
  const { weddingId, userId } = req.body;

  try {
    // Find the wedding and update the guest's payment status to 'Paid'
    const updatedWedding = await Wedding.findOneAndUpdate(
      { _id: weddingId, 'guests._id': userId },
      { $set: { 'guests.$.paymentStatus': 'Paid' } },
      { new: true }
    );

    if (!updatedWedding) {
      return res.status(404).json({ message: 'Wedding or guest not found' });
    }

    res.status(200).json({ message: 'Payment status updated to Paid' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

module.exports = router;
