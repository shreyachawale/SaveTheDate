import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostForm from './pages/HostForm';
import HomePage from './pages/MainPage';
import EnhancedWeddingDetails from './pages/WeddingDetails';

//import Completion from './pages/Completion'

import {useEffect, useState} from 'react';


import {loadStripe} from '@stripe/stripe-js';// Import the CheckoutWrapper
import PaymentForm from './pages/PaymentForm';

function App() {
  const [ stripePromise, setStripePromise ] = useState(null);

  useEffect(() => {
    fetch("/api/config").then(async (r) => {
      
      setStripePromise(loadStripe('pk_test_51Q3Aa0C7BPICGXUq8CPyRtBj3SskzQU74LQ6C1eNbX7vfqi4Ht4UncWocrZ47dRH1VL7L2lIwD84JHQPOrKVFXMr00uNsUJpdk'));
    });
  }, []);
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/host" element={<HostForm />} />
          {/*<Route path="/checkout" element={<Payment stripePromise={stripePromise} />} />*/}
          {/*<Route path="/completion" element={<Completion stripePromise={stripePromise} />} />*/}
          <Route path="/weddingdetails" element={<EnhancedWeddingDetails />} />
          <Route path="/paymentform" element={<PaymentForm />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
