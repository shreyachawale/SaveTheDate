import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import weddet1 from '../assets/weddet1.jpg';
import weddet2 from '../assets/weddet2.jpg';
import axios from 'axios'
import { useParams } from "react-router-dom";

// Moved CountdownTimer outside of the main component
const CountdownTimer = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(weddingDate) - +new Date();
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

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

export default function EnhancedWeddingDetails() {
  const { userId, id } = useParams();
  const [ticketsLeft, setTicketsLeft] = useState(50);
  const [weddingData, setWeddingData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params=useParams();
  console.log(userId)
  console.log(params)

  const carouselImages = [
    { src: weddet2, alt: "Sarah and John 1" },
    { src: weddet1, alt: "Sarah and John 2" },
  ];

  const fetchWeddingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/weddings/${id}/`);
      console.log(id)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeddingData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching wedding data:', error);
    }
  };


  useEffect(() => {
    fetchWeddingDetails();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!weddingData) {
    return <div>Loading...</div>;
  }

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  // const handlePurchaseTicket = async () => {
  //   setLoading(true); // Start loading
  
  //   try {
  //     console.log('Sending UserId:', userId); // Log userId for debugging
  //     console.log('Wedding ID:', id); // Log wedding id for clarity
  
  //     const response = await axios.patch(`http://localhost:8000/api/weddings/${id}`, {
  //       userId, // Send userId in request body
  //     });
  
  //     if (response.status === 200) {
  //       alert('User successfully added to guest list!');
  //     } else {
  //       console.warn('Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error updating guest list:', error);
  //     alert('Failed to add user to guest list. Please try again.');
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  const handleRequestAccess = async (id, userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/weddings/${id}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (response.ok) {
        alert('Request sent to the host!');
      } else {
        alert('Failed to send request.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
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
              <h1 className="text-6xl font-bold mb-4 text-white bg-clip-text">{weddingData.groomName} & {weddingData.brideName}</h1>
              <p className="text-xl mb-6">Join us in celebrating our love</p>
              <CountdownTimer weddingDate={weddingData.weddingDate} />
            </div>
          </div>
        </section>

        <section id="about" className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-primary text-center">Our Love Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {weddingData.ourStory}
            </p>
          </div>
        </section>

        <section className="mb-20 flex justify-center items-center space-x-8">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-black text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Your Ticket at Rs.{weddingData.ticketPrice}
          </button>
        </section>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">Purchase Ticket</h2>
              <p className="mb-4">Tickets Left: {weddingData.tickets}</p>
              <div className="flex justify-between">
                <button onClick={() => setIsDialogOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">Cancel</button>
                <button onClick={() => handleRequestAccess(id, userId)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Request for the Ticket</button>
              </div>
            </div>
          </div>
        )}

<section id="details" className="mb-20">
          <h2 className="text-4xl font-bold mb-6 text-primary text-center">Wedding Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Day 1 - {weddingData.day1.eventName}</h3>
              <p className="text-lg text-muted-foreground">Date: {new Date(weddingData.day1.date).toLocaleDateString()}</p>
              <p className="text-lg text-muted-foreground">Place: {weddingData.day1.place}</p>
              <p className="text-lg text-muted-foreground">Music: {weddingData.day1.music}</p>
              <p className="text-lg text-muted-foreground">Dress Code: {weddingData.day1.dressCode}</p>
              <p className="text-lg text-muted-foreground">Time: {weddingData.day1.time}</p>
            </div>

            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Day 2 - {weddingData.day2.eventName}</h3>
              <p className="text-lg text-muted-foreground">Date: {new Date(weddingData.day2.date).toLocaleDateString()}</p>
              <p className="text-lg text-muted-foreground">Place: {weddingData.day2.place}</p>
              <p className="text-lg text-muted-foreground">Music: {weddingData.day2.music}</p>
              <p className="text-lg text-muted-foreground">Dress Code: {weddingData.day2.dressCode}</p>
              <p className="text-lg text-muted-foreground">Time: {weddingData.day2.time}</p>
            </div>
          </div>
        </section>

        <section id="menu" className="mb-20">
          <h2 className="text-4xl font-bold mb-6 text-primary text-center">Wedding Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Appetizers</h3>
              <ul className="list-disc list-inside">
                {weddingData?.menu?.appetizers?.length ? (
                  weddingData.menu.appetizers.map((item, index) => (
                    <li key={index} className="text-lg text-muted-foreground">{item}</li>
                  ))
                ) : (
                  <li className="text-lg text-muted-foreground">No appetizers available</li>
                )}
              </ul>
            </div>

            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Main Course</h3>
              <ul className="list-disc list-inside">
                {weddingData?.menu?.mainCourse?.length ? (
                  weddingData.menu.mainCourse.map((item, index) => (
                    <li key={index} className="text-lg text-muted-foreground">{item}</li>
                  ))
                ) : (
                  <li className="text-lg text-muted-foreground">No main course available</li>
                )}
              </ul>
            </div>

            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Desserts</h3>
              <ul className="list-disc list-inside">
                {weddingData?.menu?.desserts?.length ? (
                  weddingData.menu.desserts.map((item, index) => (
                    <li key={index} className="text-lg text-muted-foreground">{item}</li>
                  ))
                ) : (
                  <li className="text-lg text-muted-foreground">No desserts available</li>
                )}
              </ul>
            </div>
          </div>
        </section>
        <section id="transportation" className="mb-20">
          <h2 className="text-4xl font-bold mb-6 text-primary text-center">Transportation & Accommodation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Transportation</h3>
              <p className="text-lg text-muted-foreground">{weddingData.transportation}</p>
            </div>

            <div className="border p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Accommodation</h3>
              <p className="text-lg text-muted-foreground">{weddingData.accommodation}</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
