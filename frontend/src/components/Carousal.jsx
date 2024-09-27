// Carousel.js
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Slider from 'react-slick'

// Importing CSS for react-slick
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const carouselImages = [
  "images/wedding_carousel1.avif",
  "images/wedding_carousel2.jpeg",
  "images/wedding_carousel3.jpg",
]

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Wedding scene ${index + 1}`}
              className="w-full h-[calc(100vh-80px)] object-cover filter brightness-50"
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">Experience Indian Weddings</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          "A wedding in India is not just a celebration; it's a cultural extravaganza that will leave you mesmerized."
        </p>
        <Link to="/weddings"> {/* Wrap the button in Link */}
          <button className="bg-yellow-500 text-white px-6 py-3 text-lg rounded-md">
            Explore Weddings
          </button>
        </Link>
      </div>
    </div>
  )
}
