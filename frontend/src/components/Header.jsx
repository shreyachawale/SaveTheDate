import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/images/logo_wedding.png" alt="logo" />
          <span className="text-2xl font-bold text-black group-hover:text-[#E4D6A7] transition-colors duration-300">
            SaveTheDate
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {["Destinations", "Experiences", "About Us", "Contact"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-black hover:text-[#E4D6A7] transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#E4D6A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </Link>
            )
          )}
        </nav>
        <Link to="/host">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex bg-[#E4D6A7] text-black px-6 py-2 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300"
          >
            Become a Host
          </motion.button>
        </Link>
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
                {["Destinations", "Experiences", "About Us", "Contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-black hover:text-[#E4D6A7] transition-colors duration-300 text-2xl font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  )
                )}
              </nav>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#E4D6A7] text-black px-6 py-3 rounded-md font-semibold shadow-md hover:bg-black hover:text-[#E4D6A7] transition-colors duration-300 mt-8"
              >
                Become a Host
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
