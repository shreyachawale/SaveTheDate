import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
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
      } catch (error) {
        console.error('Error fetching approved weddings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedWeddings();
  }, [userId]);

  const handlePayForWedding = async (weddingId) => {
    const stripe = await stripePromise;

    try {
      const response = await fetch(`http://localhost:8000/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weddingId, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe checkout error:', result.error.message);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-700">Loading approved weddings...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDEAE0] to-[#F2C97A] p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Approved Weddings</h1>

      {approvedWeddings.length === 0 ? (
        <p className="text-lg text-center text-gray-600">No approved requests at the moment.</p>
      ) : (
        <ul className="space-y-6 max-w-4xl mx-auto">
          {approvedWeddings.map((wedding) => (
            <li
              key={wedding._id}
              className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {wedding.groomName} & {wedding.brideName}'s Wedding
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                <span className="font-semibold">Date:</span> {new Date(wedding?.day2?.date).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-semibold">Venue:</span> {wedding?.day2?.place}
              </p>

              <p className="text-lg text-gray-700 mb-6">
                <span className="font-semibold">Payment Status:</span> {wedding.guests.find(guest => guest._id === userId)?.paymentStatus || 'Pending'}
              </p>

              {wedding.guests.find(guest => guest._id === userId)?.paymentStatus === 'Pending' && (
                <button
                  onClick={() => handlePayForWedding(wedding._id)}
                  className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
                >
                  Pay for Wedding
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestDashboard;
