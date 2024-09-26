// HomePage.js
import Carousel from '../components/Carousal'
import Header from '../components/Header'
import UserDashboard from './HostDashboard'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Carousel />
        <UserDashboard/>
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 WeddingAbroad. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
