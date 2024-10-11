import { useState, useEffect } from "react";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hostName, setHostName] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    // Get host name from local storage
    const storedHostName = localStorage.getItem("hostName");

    if (storedHostName) {
      setHostName(storedHostName);
    }
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/images/logo_wedding.png" alt="logo" />
          <span className="text-2xl font-bold text-black group-hover:text-[#E4D6A7] transition-colors duration-300">
            SaveTheDate
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {["Weddings", "Memories", "FAQs", "Contact Us"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-black hover:text-[#E4D6A7] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#E4D6A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>

        {hostName ? (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E4D6A7] text-black font-bold">
              {getInitials(hostName)}
            </div>
            <Link to="/userdashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex bg-[#E4D6A7] text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300"
              >
                Host Dashboard
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="relative">
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
                    to="/guest-auth"
                    className="block px-4 py-2 text-black hover:bg-[#E4D6A7] hover:text-white transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login as Guest
                  </Link>
                  <Link
                    to="/host-auth"
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

        <button
          className="md:hidden text-black hover:text-[#E4D6A7] transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

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
                <Link
                  to="/"
                  className="flex items-center space-x-2 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-8 w-8 text-[#E4D6A7] transition-transform duration-300 ease-in-out group-hover:scale-110" />
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
                {["Weddings", "Memories", "FAQs", "Contact Us"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-black hover:text-[#E4D6A7] transition-colors duration-300 text-2xl font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#E4D6A7] text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300 mt-8"
              >
                <Link to="/host-auth" className="w-full h-full flex justify-center items-center">
                  Login
                </Link>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
