import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import weddet1 from '../assets/weddet1.jpg';
import weddet2 from '../assets/weddet2.jpg';

export default function EnhancedWeddingDetails() {
  const [ticketsLeft, setTicketsLeft] = useState(50);
  const weddingDate = new Date("2024-08-15T16:00:00");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      description: "The Sangeet is a joyous pre-wedding celebration filled with music, dance, and performances that reflect the rich culture and traditions of Indian weddings. Friends and family of the couple come together for an evening of laughter, entertainment, and heartfelt speeches. The night will feature choreographed dance performances by both families, traditional Indian music, and a lively atmosphere that will get everyone in the spirit of celebration. The venue will be decorated in vibrant colors to create a festive and energetic ambiance. Guests are encouraged to participate in the revelry by joining the dance floor, enjoying delicious food, and sharing in the happiness of the couple's upcoming nuptials.",
      musicDancing: true,
      dressCode: "Traditional Indian Attire"
    },
    {
      day: "Day 2",
      date: "August 16, 2024",
      place: "Central Park, New York",
      event: "Wedding Ceremony",
      startTime: "4:00 PM",
      accommodation: true,
      transportation: true,
      description: "The wedding ceremony is the heart of the celebrations, where the couple will exchange vows in a beautiful outdoor setting amidst the lush greenery of Central Park. The ceremony will blend traditional rituals with modern elegance, reflecting the couple's personal journey and love story. Surrounded by close family and friends, the couple will be united in a sacred bond during this meaningful event. Following the ceremony, guests will enjoy a reception with gourmet dining, live music, and dancing under the stars. Expect a sophisticated yet warm atmosphere, with stunning décor that complements the natural beauty of the surroundings. It's a day of love, celebration, and cherished memories that will last a lifetime.",
      musicDancing: true,
      dressCode: "Formal"
    }
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
          seconds: Math.floor((difference / 1000) % 60)
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

  const handlePurchaseTicket = () => {
    if (ticketsLeft > 0) {
      setTicketsLeft(ticketsLeft - 1);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-rose-100">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-20 relative">
          <div className="relative h-[400px] rounded-lg overflow-hidden group">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-primary text-center">Our Love Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sarah and John's love story began five years ago when they met at a local coffee shop. 
              Their shared passion for travel and adventure quickly bonded them, leading to countless 
              memorable experiences around the world. Now, they're embarking on their greatest journey 
              yet - marriage. Join us in celebrating their love and the start of their new life together!
            </p>
          </div>
        </section>

        <section className="mb-20 flex justify-center items-center space-x-8">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Your Ticket
          </button>
        </section>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">Purchase Ticket</h2>
              <p className="mb-4">Tickets Left: {ticketsLeft}</p>
              <div className="flex justify-between">
                <button onClick={() => setIsDialogOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">Cancel</button>
                <button onClick={handlePurchaseTicket} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Purchase Ticket</button>
              </div>
            </div>
          </div>
        )}

        <section id="details" className="mb-20">
          <h2 className="text-4xl font-bold mb-6 text-primary text-center">Wedding Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingDays.map((day, index) => (
              <div key={index} className="border p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2">{day.day}</h3>
                <p className="text-lg text-muted-foreground">Date: {day.date}</p>
                <p className="text-lg text-muted-foreground">Place: {day.place}</p>
                <p className="text-lg text-muted-foreground">Event: {day.event}</p>
                <p className="text-lg text-muted-foreground">Start Time: {day.startTime}</p>
                <p className="text-lg text-muted-foreground">Accommodation: {day.accommodation ? "Yes" : "No"}</p>
                <p className="text-lg text-muted-foreground">Transportation: {day.transportation ? "Yes" : "No"}</p>
                <p className="mt-4">{day.description}</p>
                <p className="mt-2 font-bold">Dress Code: {day.dressCode}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
