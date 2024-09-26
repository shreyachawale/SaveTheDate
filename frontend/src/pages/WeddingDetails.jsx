import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, MapPin, Music, Utensils, Heart, Mail, Phone, User, Gift, Plane, Hotel, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import weddet1 from '../assets/weddet1.jpg';
import weddet2 from '../assets/weddet2.jpg';

export default function EnhancedWeddingDetails() {
  const [ticketsLeft, setTicketsLeft] = useState(50);
  const weddingDate = new Date("2024-08-15T16:00:00");
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    { src: weddet2, alt: "Sarah and John 1" },
    { src: weddet1, alt: "Sarah and John 2" },
  ];

  const weddingDays = [
    {
      day: "Day 1",
      date: "August 15, 2024",
      place: "Grand Hotel, New York",
      event: "Sangeet",
      startTime: "7:00 PM",
      accommodation: true,
      transportation: true,
      description: "The Sangeet is a joyous pre-wedding celebration filled with music, dance, and performances that reflect the rich culture and traditions of Indian weddings...",
      musicDancing: true,
      dressCode: "Traditional Indian Attire",
    },
    {
      day: "Day 2",
      date: "August 16, 2024",
      place: "Central Park, New York",
      event: "Wedding Ceremony",
      startTime: "4:00 PM",
      accommodation: true,
      transportation: true,
      description: "The wedding ceremony is the heart of the celebrations, where the couple will exchange vows in a beautiful outdoor setting...",
      musicDancing: true,
      dressCode: "Formal",
    },
  ];

  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
      const difference = +weddingDate - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
      if (!timeLeft[interval]) {
        return null;
      }

      return (
        <div key={interval} className="flex flex-col items-center">
          <span className="text-4xl font-bold">{timeLeft[interval]}</span>
          <span className="text-sm uppercase">{interval}</span>
        </div>
      );
    });

    return (
      <div className="flex justify-center space-x-4 bg-primary/10 p-6 rounded-lg shadow-inner">
        {timerComponents.length ? timerComponents : <span className="text-2xl font-bold">The big day is here!</span>}
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-rose-100">
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Sarah & John</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
            <li><a href="#details" className="text-muted-foreground hover:text-primary transition-colors">Details</a></li>
            <li><a href="#travel" className="text-muted-foreground hover:text-primary transition-colors">Travel</a></li>
            <li><a href="#gifts" className="text-muted-foreground hover:text-primary transition-colors">Gifts</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20 relative">
          <div className="relative h-[600px] rounded-lg overflow-hidden group">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-6xl font-bold mb-4 text-white bg-clip-text">Sarah & John's Wedding</h1>
              <p className="text-xl mb-6">Join us in celebrating our love</p>
              <CountdownTimer />
            </div>
          </div>
        </section>

        <section id="about" className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold mb-6 text-primary">Our Love Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sarah and John's love story began five years ago when they met at a local coffee shop. Their shared passion for travel and adventure quickly bonded them...
              </p>
              <button
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setTicketsLeft(prev => Math.max(0, prev - 1))}
              >
                Get Your Ticket
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src="/placeholder.svg?text=Our+Story"
                alt="Sarah and John's story"
                className="relative rounded-lg object-cover w-full shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="details" className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center text-primary">Wedding Details</h2>
          <div className="tabs">
            <div className="tabs-list grid grid-cols-3 mb-8">
              <button className="tabs-trigger">Overview</button>
              <button className="tabs-trigger">Day 1</button>
              <button className="tabs-trigger">Day 2</button>
            </div>
            <div className="tabs-content">
              {weddingDays.map((day, index) => (
                <div key={index} className="card">
                  <h3>{day.event}</h3>
                  <p>{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
