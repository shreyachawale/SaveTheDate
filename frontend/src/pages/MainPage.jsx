// HomePage.js
import Carousel from '../components/Carousal'
import PaymentButton from '../components/PaymentButton'
import TestimonialsPage from '../components/Testimonials'
import AuthPage from './HostAuth'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Carousel />
      </main>
      <TestimonialsPage/>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 WeddingAbroad. All rights reserved.
        </div>
      </footer>
      <AuthPage/>
      <PaymentButton/>
    </div>
  )
}
