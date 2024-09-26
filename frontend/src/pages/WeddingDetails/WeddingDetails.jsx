import { useState, useEffect } from "react"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, Music, Utensils, Heart, Mail, Phone, User, Gift, Plane, Hotel, Camera, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import weddet1 from '../assets/weddet1.jpg';
import weddet2 from '../assets/weddet2.jpg';

export default function EnhancedWeddingDetails() {
const [ticketsLeft, setTicketsLeft] = useState(50)
const weddingDate = new Date("2024-08-15T16:00:00")
const [currentSlide, setCurrentSlide] = useState(0)

const carouselImages = [
  { src: weddet2, alt: "Sarah and John 1" },
  { src: weddet1, alt: "Sarah and John 2" },
]

const weddingDays = [
  {
    day: "Day 1",
    date: "August 15, 2024",
    place: "Grand Hotel, New York",
    event: "Sangeet",
    startTime: "7:00 PM",
    accommodation: true,
    transportation: true,
    description: "The Sangeet is a joyous pre-wedding celebration filled with music, dance, and performances that reflect the rich culture and traditions of Indian weddings. Friends and family of the couple come together for an evening of laughter, entertainment, and heartfelt speeches. The night will feature choreographed dance performances by both families, traditional Indian music, and a lively atmosphere that will get everyone in the spirit of celebration. The venue will be decorated in vibrant colors to create a festive and energetic ambiance. Guests are encouraged to participate in the revelry by joining the dance floor, enjoying delicious food, and sharing in the happiness of the couple’s upcoming nuptials.",
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
    description: "The wedding ceremony is the heart of the celebrations, where the couple will exchange vows in a beautiful outdoor setting amidst the lush greenery of Central Park. The ceremony will blend traditional rituals with modern elegance, reflecting the couple’s personal journey and love story. Surrounded by close family and friends, the couple will be united in a sacred bond during this meaningful event. Following the ceremony, guests will enjoy a reception with gourmet dining, live music, and dancing under the stars. Expect a sophisticated yet warm atmosphere, with stunning décor that complements the natural beauty of the surroundings. It’s a day of love, celebration, and cherished memories that will last a lifetime.",
    musicDancing: true,
    dressCode: "Formal"
  }
]

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl font-bold">{timeLeft[interval]}</span>
        <span className="text-sm uppercase">{interval}</span>
      </div>
    )
  })

  return (
    <div className="flex justify-center space-x-4 bg-primary/10 p-6 rounded-lg shadow-inner">
      {timerComponents.length ? timerComponents : <span className="text-2xl font-bold">The big day is here!</span>}
    </div>
  )
}

const nextSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
}

const prevSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length)
}

useEffect(() => {
  const timer = setInterval(nextSlide, 5000)
  return () => clearInterval(timer)
}, [])

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
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
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
              Sarah and John's love story began five years ago when they met at a local coffee shop. 
              Their shared passion for travel and adventure quickly bonded them, leading to countless 
              memorable experiences around the world. Now, they're embarking on their greatest journey 
              yet - marriage. Join us in celebrating their love and the start of their new life together!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">Get Your Ticket</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Reserve Your Spot</DialogTitle>
                  <DialogDescription>
                    There are only {ticketsLeft} tickets left. Secure yours now!
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button onClick={() => setTicketsLeft(prev => Math.max(0, prev - 1))}>
                    Reserve Ticket
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Image
              src="/placeholder.svg?text=Our+Story"
              alt="Sarah and John's story"
              width={600}
              height={400}
              className="relative rounded-lg object-cover w-full shadow-lg"
            />
          </div>
        </div>
      </section>

      <section id="details" className="mb-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Wedding Details</h2>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="day1">Day 1</TabsTrigger>
            <TabsTrigger value="day2">Day 2</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Wedding Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center"><User className="w-5 h-5 mr-2 text-primary" />Languages Spoken</h3>
                    <p className="text-muted-foreground">English, Hindi, Spanish</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center"><Utensils className="w-5 h-5 mr-2 text-primary" />Dietary Options</h3>
                    <p className="text-muted-foreground">Vegetarian, Vegan, Gluten-free options available</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center"><Heart className="w-5 h-5 mr-2 text-primary" />General Dress Code</h3>
                    <p className="text-muted-foreground">Smart Casual to Formal (see event details)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {weddingDays.map((day, index) => (
            <TabsContent key={index} value={`day${index + 1}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{day.event}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <CalendarDays className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold text-lg">Date</h4>
                        <p className="text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Clock className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold text-lg">Start Time</h4>
                        <p className="text-muted-foreground">{day.startTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <MapPin className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold text-lg">Location</h4>
                        <p className="text-muted-foreground">{day.place}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Description</h4>
                      <p className="text-muted-foreground">{day.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant={day.accommodation ? "default" : "secondary"} className="text-sm py-1 px-3">
                        Accommodation {day.accommodation ? "Included" : "Not Included"}
                      </Badge>
                      <Badge variant={day.transportation ? "default" : "secondary"} className="text-sm py-1 px-3">
                        Transportation {day.transportation ? "Provided" : "Not Provided"}
                      </Badge>
                      <Badge variant={day.musicDancing ? "default" : "secondary"} className="text-sm py-1 px-3">
                        <Music className="w-4 h-4 mr-1" />
                        Music and Dancing {day.musicDancing ? "Allowed" : "Not Allowed"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6">
                      <Utensils className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold text-lg">Dress Code</h4>
                        <p className="text-muted-foreground">{day.dressCode}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="travel" className="mb-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Travel Information</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Plane className="w-8 h-8 text-primary" />
                Getting There
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg">The nearest airports to the wedding venue are:</p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>John F. Kennedy International Airport (JFK) - 45 minutes drive</li>
                <li>LaGuardia Airport (LGA) - 30 minutes drive</li>
                <li>Newark Liberty International Airport (EWR) - 1 hour drive</li>
              </ul>
              <p className="mt-6 text-muted-foreground">We recommend using ride-sharing services or renting a car for transportation from the airport.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Hotel className="w-8 h-8 text-primary" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg">We have arranged special rates at the following hotels:</p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>Grand Hotel New York - Wedding venue (20% discount)</li>
                <li>Comfort Inn Downtown - 10 minutes walk (15% discount)</li>
                <li>City View Hotel - 5 minutes drive (10% discount)</li>
              </ul>
              <p className="mt-6 text-muted-foreground">Please use the code "SARAHJOHN2024" when booking to avail the discounts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>

    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <a href="mailto:sarahandjohn@wedding.com" className="hover:underline">sarahandjohn@wedding.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#details" className="hover:underline">Wedding Details</a></li>
              <li><a href="#travel" className="hover:underline">Travel Information</a></li>
              <li><a href="#gifts" className="hover:underline">Gift Registry</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p>&copy; 2024 Sarah & John's Wedding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
)
}