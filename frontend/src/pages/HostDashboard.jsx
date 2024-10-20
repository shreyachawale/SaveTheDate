import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HostDashboard = () => {
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hostId } = useParams();

  // Fetch the weddings hosted by the logged-in host
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/hosts/${hostId}/weddings`);
        const data = await response.json();
        setWeddings(data.weddings || []); // Safely setting weddings, default to an empty array if undefined
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weddings:', error);
        setLoading(false);
      }
    };

    fetchWeddings();
  }, [hostId]);

  // Approve a request
  const handleApproveRequest = async (weddingId, userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/weddings/${weddingId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        alert('User approved!');
        setWeddings((prevWeddings) =>
          prevWeddings.map((wedding) =>
            wedding._id === weddingId
              ? {
                  ...wedding,
                  requests: wedding.requests?.filter((request) => request._id !== userId) || [], // Ensure requests is an array
                  guests: [
                    ...wedding.guests, // Retaining existing guests
                    { guestId: userId, paymentStatus: 'Pending' }, // Add guest with payment status
                  ],
                }
              : wedding
          )
        );
      } else {
        alert('Failed to approve user.');
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  if (loading) {
    return <p>Loading weddings...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F4E5] to-[#E4D6A7] p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Host Dashboard
      </h1>

      {weddings.length === 0 ? (
        <p className="text-lg text-center text-gray-600">No weddings found</p>
      ) : (
        weddings.map((wedding) => (
          <div
            key={wedding._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {wedding.groomName} & {wedding.brideName}'s Wedding
            </h2>

            {/* Display list of guests with payment status */}
            {wedding.guests?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Approved Guests:</h3>
                {wedding.guests.map((guest) => (
                  <div
                    key={guest.guestId}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-3 shadow-sm"
                  >
                    <div>
                      <p className="text-gray-800">
                        <span className="font-bold">Guest ID:</span> {guest.guestId}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Payment Status:</span>{' '}
                        {guest.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {wedding.requests?.length === 0 ? (
              <p className="text-center text-gray-600">No requests for this wedding</p>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Pending Requests:</h3>
                {wedding.requests.map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-sm mb-3"
                  >
                    <p className="text-gray-800">
                      <span className="font-medium">{request.name}</span> wants to join your wedding
                    </p>
                    <button
                      onClick={() => handleApproveRequest(wedding._id, request._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HostDashboard;
