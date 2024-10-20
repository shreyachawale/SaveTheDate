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
import WeddingForm from './pages/HostForm';
import HostLogin from './pages/HostLogin';
import HostRegister from './pages/HostRegister';
import SuccessPayment from './pages/paymentsuccess';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import GuestDashboard from './pages/GuestDashboard';
import PaymentSuccess from './pages/Success';
import ContactUs from './pages/Contact';

// Layout component to wrap all pages and include Header everywhere
const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main> {/* Render the page content here */}
  </>
);

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Use Layout to ensure Header is present on every page */}
        <Route path="/" element={<Layout><HomePage /></Layout>} /> 
        <Route path="/:userId" element={<Layout><HomePage /></Layout>} /> 
        <Route path="/wedding-details/:id" element={<Layout><EnhancedWeddingDetails /></Layout>} /> 
        <Route path="/:userId/wedding-details/:id" element={<Layout><EnhancedWeddingDetails /></Layout>} /> 
        <Route path="/weddings" element={<Layout><ImageCard /></Layout>} />
        <Route path="/:userId/weddings" element={<Layout><ImageCard /></Layout>} />
        <Route path="/memories" element={<Layout><Memories /></Layout>} />
        <Route path="/:userId/memories" element={<Layout><Memories /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQsPage /></Layout>} />
        <Route path="/:userId/faqs" element={<Layout><FAQsPage /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest/register" element={<Register />} />
        <Route path="/guest/login" element={<Login />} />
        <Route path="/success" element={<Layout><SuccessPayment /></Layout>} />
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/register" element={<HostRegister />} />
        <Route path="/host/:id/hostform" element={<Layout><WeddingForm /></Layout>} />
        <Route path="/host/:hostId/main" element={<Layout><HostMainPage /></Layout>} />
        <Route path="/host/:hostId/userdashboard" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/:userId/userdashboard" element={<Layout><GuestDashboard /></Layout>} />
        <Route path="/userdashboard" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/payment" element={<Layout><PaymentForm /></Layout>} />
        <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
        <Route path="/:userId/contac-us" element={<Layout><ContactUs /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
