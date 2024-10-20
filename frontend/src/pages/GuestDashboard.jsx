import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key (from your Stripe dashboard)
const stripePromise = loadStripe('pk_test_51Q3Aa0C7BPICGXUq8CPyRtBj3SskzQU74LQ6C1eNbX7vfqi4Ht4UncWocrZ47dRH1VL7L2lIwD84JHQPOrKVFXMr00uNsUJpdk'); 

const GuestDashboard = () => {
  const [approvedWeddings, setApprovedWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchApprovedWeddings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/guests/${userId}/approved-weddings`);
        const data = await response.json();

        if (data && Array.isArray(data.weddings)) {
          setApprovedWeddings(data.weddings);
        } else {
          setApprovedWeddings([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching approved weddings:', error);
        setLoading(false);
      }
    };

    fetchApprovedWeddings();
  }, [userId]);

  // Function to handle the payment process
  const handlePayForWedding = async (weddingId) => {
    const stripe = await stripePromise;

    try {
      const response = await fetch(`http://localhost:8000/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weddingId, userId }), // Send wedding and user info
      });

      const session = await response.json();

      // Redirect to the Stripe checkout page
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe checkout error:', result.error.message);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  if (loading) {
    return <p>Loading approved weddings...</p>;
  }

  return (
    <div>
      <h1>Your Approved Wedding Requests</h1>
      {approvedWeddings.length === 0 ? (
        <p>No approved requests at the moment.</p>
      ) : (
        <ul>
          {approvedWeddings.map((wedding) => (
            <li key={wedding._id}>
              <h2>{wedding.groomName} & {wedding.brideName}'s Wedding</h2>
              <p>Date: {new Date(wedding?.day2?.date).toLocaleDateString()}</p>
              <p>Venue: {wedding?.day2?.place}</p>

              {/* Button to pay for the wedding */}
              <button onClick={() => handlePayForWedding(wedding._id)}>Pay for Wedding</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestDashboard;
