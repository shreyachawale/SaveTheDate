import { loadStripe } from '@stripe/stripe-js';


async function MakePayment() {
  try {

    // const getWeddingdetails =async()=>{
    //   const data =await fetch()
  

    // }
    // Load Stripe with the publishable key
    const stripe = await loadStripe("pk_test_51Q3Aa0C7BPICGXUq8CPyRtBj3SskzQU74LQ6C1eNbX7vfqi4Ht4UncWocrZ47dRH1VL7L2lIwD84JHQPOrKVFXMr00uNsUJpdk");

    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    // Prepare the data for checkout session creation
    const body = {
      weddings: [
        {
          name: "your desired wedding",
          price: 200, // Amount in dollars, to be converted to cents by the backend
          quantity:1

         
        },
      ]
      
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Send a request to create a checkout session
    const response = await fetch(`http://localhost:8000/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      
    }

    const session = await response.json();

    // Redirect the user to the Stripe checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Stripe Checkout Error:", result.error.message);
    }
  } catch (error) {
    console.error("Error making payment:", error.message);
  }
}




const PaymentForm = () => {
  return (
    <div>
      <button onClick={MakePayment}>make the payment</button>
      
    </div>
  )
}

export default PaymentForm




