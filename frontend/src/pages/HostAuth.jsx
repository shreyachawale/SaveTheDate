// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import HostLogin from '../components/HostAuth/HostLogin';
// import HostRegister from '../components/HostAuth/HostRegister';

// export default function AuthPage() {
//   const [activeTab, setActiveTab] = useState('login');
//   const navigate = useNavigate();

//   // Callback for successful login
//   const handleLoginSuccess = (user) => {
//     if (user && user.host && user.host.name) {
//       const userName = user.host.name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with dashes for the URL
//       navigate(`/host-main/${userName}`);
//     } else {
//       console.error("User data is missing the 'name' field");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FEF1E6] p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="w-full">
//           <div className="grid w-full grid-cols-2 bg-[#E4D6A7]">
//             <button
//               onClick={() => setActiveTab('login')}
//               className={`text-black py-2 ${activeTab === 'login' ? 'bg-white' : ''}`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setActiveTab('register')}
//               className={`text-black py-2 ${activeTab === 'register' ? 'bg-white' : ''}`}
//             >
//               Register
//             </button>
//           </div>
//           <div className="mt-4">
//             {activeTab === 'login' && <HostLogin onLoginSuccess={handleLoginSuccess} />}
//             {activeTab === 'register' && <HostRegister />}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
