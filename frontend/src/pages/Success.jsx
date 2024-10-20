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

  return <div>Payment successful! Your payment status has been updated.</div>;
};

export default PaymentSuccess;
