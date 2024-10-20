import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const weddingId = searchParams.get('weddingId');
  const userId = searchParams.get('userId');

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/payments/update-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ weddingId, userId }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Payment status updated:', data.message);
        } else {
          console.error('Failed to update payment status:', data.error);
        }
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    };

    updatePaymentStatus();
  }, [weddingId, userId]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#EDEAE0] to-[#F2C97A] p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
        <div className="text-6xl mb-6">🎉</div> {/* Celebratory emoji */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment for the wedding has been successfully processed, and your status has been updated.
        </p>
        <p className="text-lg text-gray-700">
          Thank you for your payment! If you have any questions, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
