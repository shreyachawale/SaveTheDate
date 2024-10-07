import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostForm from './pages/HostForm';
import HomePage from './pages/MainPage';
import EnhancedWeddingDetails from './pages/WeddingDetails';
import PaymentForm from './pages/PaymentForm';
import ImageCard from './components/ImageCard/ImageCard';
import Header from './components/Header';
import Memories from './pages/Memories/Memories';
import FAQsPage from './pages/FAQsPage/FAQsPage';
import UserDashboard from './pages/HostDashboard';
// import AuthPage from './pages/HostAuth';
import HostMainPage from './pages/HostMain';
import { loadStripe } from '@stripe/stripe-js'; // Import the CheckoutWrapper
import { useEffect, useState } from 'react';
import Register from './pages/userRegister'
import Login from './pages/userLogin';
import "react-toastify/dist/ReactToastify.css" 

function App() {
  // const [stripePromise, setStripePromise] = useState(null);

  // useEffect(() => {
  //   fetch("/api/config").then(async (r) => {
  //     setStripePromise(loadStripe('pk_test_51Q3Aa0C7BPICGXUq8CPyRtBj3SskzQU74LQ6C1eNbX7vfqi4Ht4UncWocrZ47dRH1VL7L2lIwD84JHQPOrKVFXMr00uNsUJpdk'));
  //   });
  // }, []);

  return (
    <Router>
      <div className="">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />    {/* Home page */}
          <Route path="/host" element={<HostForm />} /> {/* HostForm page */}

          <Route path="/host-main/:userName" element={<HostMainPage />} /> {/* HostForm page */}
          <Route path="/wedding-details" element={<EnhancedWeddingDetails />} /> {/* Wedding Details page */}
          <Route path="/paymentform" element={<PaymentForm />} /> {/* Payment form page */}
          <Route path="/weddings" element={<ImageCard />} /> {/* Payment form page */}
          <Route path="/memories" element={<Memories />} /> {/* Payment form page */}
          <Route path="/faqs" element={<FAQsPage />} /> {/* Payment form page */}
  
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdashboard" element={<UserDashboard />} /> {/* Payment form page */}
          <Route path="/payment" element={<PaymentForm />} /> {/* Payment form page */}
        </Routes>
      </div>
          
    </Router>
  );
}

export default App;
