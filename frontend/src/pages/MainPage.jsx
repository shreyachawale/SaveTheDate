// HomePage.js
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousal'

import PaymentButton from '../components/PaymentButton'
import TestimonialsPage from '../components/Testimonials'
import { useCookies } from "react-cookie";
import { useEffect,useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import AuthPage from './HostAuth'

export default function HomePage() {
   const [ishost,setHost]=useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie,removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      
        const{data}=await axios.post('http://localhost:8000/',{},{withCredentials:true})
        if(!data.status){
          removeCookie("jwt")
          navigate('/login')
        }else{ toast(`HEY ${data.user.name}`)}
      }
        
      
  
    const logout=()=>{
      removeCookie("jwt")
      navigate("/register")
    }
    verifyUser();
  }, [cookies,setCookie,removeCookie,navigate])
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Carousel />
      </main>
      <TestimonialsPage/>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 WeddingAbroad. All rights reserved.
        </div>
      </footer>
    {/* <AuthPage/> */}
      <PaymentButton/>
    </div>
  )
}
