import React from 'react';
import { useState } from 'react';

export default function WeddingEventForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venueName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    maxCapacity: '',
    pricing: '',
    currency: 'USD',
    hostName: '',
    hostEmail: '',
    hostPhone: '',
    hostIdNumber: '',
    hostIdType: 'aadharCard',
    subhostName: '',
    subhostEmail: '',
    subhostPhone: '',
    eventType: 'traditional',
    eventWebsite: '',
    socialMediaHandle: '',
    termsAndConditions: false,
    dataConsent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center p-12">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-12 space-y-12">
        <div className="flex justify-between items-center">
          <button className="text-4xl text-gray-500 hover:text-gray-700 transition-colors" aria-label="Go back">&larr;</button>
          <h1 className="text-5xl font-bold text-center text-gray-800">Wedding Event</h1>
          <button className="text-4xl text-gray-500 hover:text-gray-700 transition-colors" aria-label="More options">&#8942;</button>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Host Your Wedding Event</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let tourists experience the beauty of Indian weddings. Our platform allows you to host your wedding event and share the rich cultural heritage of Indian weddings with a global audience.
          </p>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="col-span-2">
              <label htmlFor="eventName" className="block text-xl font-medium text-gray-700 mb-2">Event Name</label>
              <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} className="text-lg w-full border border-gray-300 rounded-lg p-2" required />
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-xl font-medium text-gray-700 mb-2">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="text-lg w-full border border-gray-300 rounded-lg p-2 min-h-[100px]" required />
            </div>

            {/* Date and Time fields */}
            <div>
              <label htmlFor="startDate" className="block text-xl font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="text-lg w-full border border-gray-300 rounded-lg p-2" required />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-xl font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="text-lg w-full border border-gray-300 rounded-lg p-2" required />
            </div>

            {/* Additional fields... */}
          </div>

          <button type="submit" className="w-full text-xl py-6 bg-blue-600 hover:bg-blue-700 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
}
