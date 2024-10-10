import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/MainPage';
import EnhancedWeddingDetails from './pages/WeddingDetails';
import PaymentForm from './pages/PaymentForm';
import ImageCard from './components/ImageCard/ImageCard';
import Header from './components/Header';
import Memories from './pages/Memories/Memories';
import FAQsPage from './pages/FAQsPage/FAQsPage';
import UserDashboard from './pages/HostDashboard';
import HostMainPage from './pages/HostMain';
import Register from './pages/userRegister';
import Login from './pages/userLogin';
import "react-toastify/dist/ReactToastify.css"; 
import WeddingForm from './pages/HostForm';
import HostLogin from './pages/HostLogin';
import HostRegister from './pages/HostRegister';
import SuccessPayment from './pages/paymentsuccess';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/host/:id/hostform" element={<WeddingForm />} /> {/* HostForm page */}
          <Route path="/host/:hostId/main" element={<HostMainPage />} /> {/* HostMainPage */}
          <Route path="/wedding-details" element={<EnhancedWeddingDetails />} /> {/* Wedding Details page */}
          <Route path="/weddings" element={<ImageCard />} /> {/* Wedding images */}
          <Route path="/memories" element={<Memories />} /> {/* Memories page */}
          <Route path="/faqs" element={<FAQsPage />} /> {/* FAQs page */}
          <Route path="/register" element={<Register />} /> {/* User Registration */}
          <Route path="/login" element={<Login />} /> {/* User Login */}
          <Route path="/guest/register" element={<Register />} />
          <Route path="/guest/login" element={<Login />} />
          <Route path="/success" element={<SuccessPayment />} /> {/* Success Payment */}
          <Route path="/host/login" element={<HostLogin />} /> {/* Host Login */}
          <Route path="/host/register" element={<HostRegister />} /> {/* Host Registration */}
          <Route path="/userdashboard" element={<UserDashboard />} /> {/* User Dashboard */}
          <Route path="/payment" element={<PaymentForm />} /> {/* Payment form page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
