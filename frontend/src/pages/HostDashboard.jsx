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
        console.log(data)
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
        // Optionally, update the state to remove the approved user from requests
        setWeddings(prevWeddings =>
          prevWeddings.map(wedding =>
            wedding._id === weddingId
              ? {
                  ...wedding,
                  requests: wedding.requests?.filter(request => request._id !== userId) || [], // Ensure requests is an array
                  guests: [...(wedding.guests || []), userId], // Add user to guests array
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
    <div>
      <h1>Host Dashboard</h1>

      {weddings.length === 0 ? (
        <p>No weddings found</p>
      ) : (
        weddings.map((wedding) => (
          <div key={wedding._id} className="wedding-card">
            <h2>{wedding.groomName} & {wedding.brideName}'s Wedding</h2>
            
            {wedding.requests?.length === 0 ? ( // Safely checking if requests exists and has a length
              <p>No requests for this wedding</p>
            ) : (
              <div>
                <h3>Pending Requests:</h3>
                {wedding.requests.map((request) => (
                  <div key={request._id} className="request-card">
                    <p>{request.name} wants to join your wedding</p>
                    <button onClick={() => handleApproveRequest(wedding._id, request._id)}>Approve</button>
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
