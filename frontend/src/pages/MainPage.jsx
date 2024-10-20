import { useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousal';
import PaymentButton from '../components/PaymentButton';
import TestimonialsPage from '../components/Testimonials';
import { useCookies } from "react-cookie";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PaymentForm from '../components/upi';

export default function HomePage() {
  const [isHost, setHost] = useState(false);
  const [userData, setUserData] = useState(null); // To store user data
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { userId } = useParams(); // Get userId from URL params

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Fetch user authentication status (assuming the endpoint is at root `/`)
        const { data } = await axios.get(`http://localhost:8000/api/guests/${userId}`, {
          withCredentials: true,
        });
        
        console.log(userId)
        console.log(data)
        setUserData(data)
        
        
      } catch (err) {
        console.log(err);
      }
    };

    verifyUser();
  }, [cookies, removeCookie, navigate, userId]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Carousel />
        {/* Display user data if available */}
        {userData && (
          <div className="text-center mt-6">
            <h1 className="text-2xl font-bold">Hello, {userData.name}!</h1>
            <p>Your email: {userData.email}</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
              Logout
            </button>
          </div>
        )}
      </main>
      <TestimonialsPage />
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 WeddingAbroad. All rights reserved.
        </div>
      </footer>
      <PaymentButton />
      <PaymentForm/>
    </div>
  );
}
