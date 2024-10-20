import { useState, useEffect } from "react";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Link, useParams,useNavigate  } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hostName, setHostName] = useState(null);
  const { userId } = useParams(); 
  const {hostId} = useParams();
  const navigate = useNavigate();


  // Fetch user data if ID exists
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    if (userId) {
      axios
        .get(`http://localhost:3000/api/guests/${userId}`)
        .then(({ data }) => setHostName(data.name))
        .catch((err) => console.error("Failed to fetch user data", err));
    }
  }, [isMenuOpen, userId]);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "";

  // Define navigation routes dynamically
  const navRoutes = [
    { name: "Weddings", path: `${userId ? `/${userId}` : ""}/weddings` },
    { name: "Memories", path: `${userId ? `/${userId}` : ""}/memories` },
    { name: "FAQs", path: `${userId ? `/${userId}` : ""}/faqs` },
    { name: "Contact Us", path: `${userId ? `/${userId}` : ""}/contact-us` },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };
  const handleLogout = () => {
    localStorage.clear(); // Or any session clearing logic
    navigate("/"); // Redirect to homepage or login page
  };

  return (
    <header className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="flex items-center space-x-2 group">
          <img src="/images/logo_wedding.png" alt="logo" />
          <span className="text-2xl font-bold text-black group-hover:text-[#E4D6A7] transition-colors duration-300">
            SaveTheDate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navRoutes.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-black hover:text-[#E4D6A7] transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#E4D6A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>

        {/* Host or Guest Dashboard based on ID */}
        {userId ? (
          <div className="flex items-center space-x-4">
          {/* If user is logged in, show Guest Dashboard */}
          <Link to={`/${userId}/userdashboard`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex bg-[#E4D6A7] text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300"
            >
              Dashboard
            </motion.button>
          </Link>
          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="hidden md:inline-flex bg-[#FF5A5F] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </motion.button>
        </div>
) : hostId ? (
  <div className="flex items-center space-x-4">
      {/* If host is logged in, show Host Dashboard */}
      <Link to={`/host/${hostId}/userdashboard`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex bg-[#E4D6A7] text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300"
        >
          Host Dashboard
        </motion.button>
      </Link>
      {/* Logout button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="hidden md:inline-flex bg-[#FF5A5F] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition-colors duration-300"
      >
        Logout
      </motion.button>
    </div>
) : (
  <div className="relative">
    {/* Login Dropdown for Guests and Hosts */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="hidden md:inline-flex bg-[#E4D6A7] text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300 flex items-center"
    >
      Login <ChevronDown className="ml-2 h-5 w-5" />
    </motion.button>

    {/* Dropdown Menu */}
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-md rounded-md z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            to="/guest/login"
            className="block px-4 py-2 text-black hover:bg-[#E4D6A7] hover:text-white transition-colors duration-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            Login as Guest
          </Link>
          <Link
            to="/host/login"
            className="block px-4 py-2 text-black hover:bg-[#E4D6A7] hover:text-white transition-colors duration-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            Login as Host
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)}


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black hover:text-[#E4D6A7] transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 group">
                  <Heart className="h-8 w-8 text-[#E4D6A7] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-2xl font-bold text-black group-hover:text-[#E4D6A7] transition-colors duration-300">
                    SaveTheDate
                  </span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-[#E4D6A7] transition-colors duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6 flex-grow justify-center">
                {navRoutes.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-black hover:text-[#E4D6A7] transition-colors duration-300 text-2xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
