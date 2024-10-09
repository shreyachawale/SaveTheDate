import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  "/placeholder.svg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
];

const reasons = [
  "Create unforgettable memories",
  "Share your culture with travelers",
  "Offset wedding costs",
  "Make new friends from around the world",
];

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and verify your identity",
  },
  {
    title: "List Your Wedding",
    description: "Add details about your special day and what you're offering",
  },
  {
    title: "Set Your Preferences",
    description: "Choose the type of travelers you'd like to host",
  },
  {
    title: "Connect with Travelers",
    description: "Review applications and select your guests",
  },
];

export default function HostMainPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF1E6]">
      {/* Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={carouselImages[currentImage]}
              alt={`Wedding scene ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Host Your Dream Wedding
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
          >
            Share your special day with travelers from around the world and
            create unforgettable memories
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              className="bg-[#E4D6A7] text-black py-3 px-6 rounded-lg hover:bg-[#d8c79b] transition-colors duration-300"
            >
              Host Now
            </button>
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImage
                  ? "bg-[#E4D6A7]"
                  : "bg-white bg-opacity-50"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
          onClick={() =>
            setCurrentImage(
              (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
            )
          }
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full"
          onClick={() =>
            setCurrentImage((prev) => (prev + 1) % carouselImages.length)
          }
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Why Couples Love Hosting */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-black mb-12"
        >
          Why do our couples love hosting travelers at their weddings?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-lg font-semibold text-center text-black">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps to Host */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#E4D6A7]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-black mb-12"
        >
          Steps to Host Your Wedding
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center mb-8"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                {index + 1}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-black">
                  {step.title}
                </h3>
                <p className="text-gray-700 mt-2">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-black mb-6"
        >
          Ready to make your wedding unforgettable?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Start Hosting Now
          </button>
        </motion.div>
      </section>
    </div>
  );
}
