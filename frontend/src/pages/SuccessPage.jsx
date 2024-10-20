// src/SuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-5xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your payment. Your wedding is confirmed!
        </p>
        <Link to="/" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
