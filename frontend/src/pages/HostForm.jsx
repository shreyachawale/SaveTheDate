import React from "react";

export default function WeddingEventForm() {
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
            Let tourists experience the beauty of Indian weddings. Our platform allows you to host your
            wedding event and share the rich cultural heritage of Indian weddings with a global audience.
          </p>
        </div>
        
        <form className="space-y-10">
          {/* Event Name */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="col-span-2">
              <label htmlFor="eventName" className="block text-xl font-medium text-gray-700 mb-2">Event Name</label>
              <input type="text" id="eventName" placeholder="Rohan & Priya's Wedding" className="text-lg border rounded p-2 w-full" required />
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-xl font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              placeholder="A grand celebration of love and tradition, featuring vibrant ceremonies, traditional attire, and exquisite cuisine."
              className="text-lg border rounded p-2 w-full min-h-[100px]"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label htmlFor="startDate" className="block text-xl font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" id="startDate" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-xl font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" id="endDate" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-xl font-medium text-gray-700 mb-2">Start Time</label>
              <input type="time" id="startTime" defaultValue="10:00" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-xl font-medium text-gray-700 mb-2">End Time</label>
              <input type="time" id="endTime" defaultValue="23:00" className="text-lg border rounded p-2 w-full" required />
            </div>
          </div>

          {/* Venue Information */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="col-span-2">
              <label htmlFor="venueName" className="block text-xl font-medium text-gray-700 mb-2">Venue Name</label>
              <input type="text" id="venueName" placeholder="Taj Palace" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div className="col-span-2">
              <label htmlFor="address" className="block text-xl font-medium text-gray-700 mb-2">Address</label>
              <input type="text" id="address" placeholder="Sardar Patel Marg" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="city" className="block text-xl font-medium text-gray-700 mb-2">City</label>
              <input type="text" id="city" placeholder="New Delhi" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="state" className="block text-xl font-medium text-gray-700 mb-2">State</label>
              <input type="text" id="state" placeholder="Delhi" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-xl font-medium text-gray-700 mb-2">Zip Code</label>
              <input type="text" id="zipCode" placeholder="110021" className="text-lg border rounded p-2 w-full" required />
            </div>
          </div>

          {/* Capacity and Pricing */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label htmlFor="maxCapacity" className="block text-xl font-medium text-gray-700 mb-2">Maximum Capacity</label>
              <input type="number" id="maxCapacity" placeholder="500" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="pricing" className="block text-xl font-medium text-gray-700 mb-2">Pricing Details</label>
              <input type="text" id="pricing" placeholder="$100 per guest" className="text-lg border rounded p-2 w-full" required />
            </div>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-4">Currency</label>
            <div className="flex space-x-8">
              {["USD", "INR", "EUR", "GBP"].map((currency) => (
                <div key={currency} className="flex items-center">
                  <input type="radio" name="currency" value={currency} id={currency} className="mr-2" required />
                  <label htmlFor={currency} className="text-lg">{currency}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Host Information */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <label htmlFor="hostName" className="block text-xl font-medium text-gray-700 mb-2">Host Name</label>
              <input type="text" id="hostName" placeholder="Rohan Sharma" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="hostEmail" className="block text-xl font-medium text-gray-700 mb-2">Host Email</label>
              <input type="email" id="hostEmail" placeholder="rohan.sharma@example.com" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="hostPhone" className="block text-xl font-medium text-gray-700 mb-2">Host Phone</label>
              <input type="tel" id="hostPhone" placeholder="+91 98765 43210" className="text-lg border rounded p-2 w-full" required />
            </div>
            <div>
              <label htmlFor="hostIdNumber" className="block text-xl font-medium text-gray-700 mb-2">Host ID Number</label>
              <input type="text" id="hostIdNumber" placeholder="ABCDE1234F" className="text-lg border rounded p-2 w-full" required />
            </div>
          </div>

          {/* Host ID Type */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-4">Host ID Type</label>
            <div className="grid grid-cols-2 gap-4">
              {["Aadhar Card", "PAN Card", "Passport", "Driving License"].map((idType) => (
                <div key={idType} className="flex items-center">
                  <input type="radio" name="hostIdType" value={idType} id={idType} className="mr-2" required />
                  <label htmlFor={idType} className="text-lg">{idType}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Subhost Information */}
          <div className="grid grid-cols-3 gap-x-12 gap-y-8">
            <div>
              <label htmlFor="subhostName" className="block text-xl font-medium text-gray-700 mb-2">Subhost Name</label>
              <input type="text" id="subhostName" placeholder="Priya Sharma" className="text-lg border rounded p-2 w-full" />
            </div>
            <div>
              <label htmlFor="subhostEmail" className="block text-xl font-medium text-gray-700 mb-2">Subhost Email</label>
              <input type="email" id="subhostEmail" placeholder="priya.sharma@example.com" className="text-lg border rounded p-2 w-full" />
            </div>
            <div>
              <label htmlFor="subhostPhone" className="block text-xl font-medium text-gray-700 mb-2">Subhost Phone</label>
              <input type="tel" id="subhostPhone" placeholder="+91 98765 43211" className="text-lg border rounded p-2 w-full" />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-lg">I agree to the Terms and Conditions</label>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition-colors">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
