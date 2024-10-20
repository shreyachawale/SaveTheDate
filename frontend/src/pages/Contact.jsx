import { useState } from 'react';

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E4D6A7] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            We'd love to hear from you!
          </p>
          <div className="mx-auto mt-4 text-[#E4D6A7] animate-bounce" style={{ fontSize: '32px' }}>❤</div>
        </div>

        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg transition-transform duration-500 ease-in-out hover:shadow-2xl">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E4D6A7] focus:border-[#E4D6A7] sm:text-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E4D6A7] focus:border-[#E4D6A7] sm:text-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#E4D6A7] focus:border-[#E4D6A7] sm:text-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#E4D6A7] text-gray-900 py-2 px-4 rounded-md hover:bg-[#c8ba7c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E4D6A7] transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                {isSubmitted && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
