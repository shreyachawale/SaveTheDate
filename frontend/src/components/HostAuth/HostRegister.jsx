// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function HostRegister() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/hosts/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to register. Please try again.');
//       }

//       const data = await response.json();
//       console.log('Registration successful:', data);

//       // Optionally reset the form here
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold text-center text-black mb-6">Create an Account</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <label htmlFor="register-name" className="text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             id="register-name"
//             name="name"
//             type="text"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4D6A7]"
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="register-email" className="text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             id="register-email"
//             name="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4D6A7]"
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="register-mobile" className="text-sm font-medium text-gray-700">
//             Mobile Number
//           </label>
//           <input
//             id="register-mobile"
//             name="phone"
//             type="tel"
//             placeholder="Enter your mobile number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4D6A7]"
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="register-password" className="text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             id="register-password"
//             name="password"
//             type="password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4D6A7]"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-300 px-3 py-2 rounded-md"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </motion.div>
//   );
// }
