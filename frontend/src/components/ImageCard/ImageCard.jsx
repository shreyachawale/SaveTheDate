import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ImageCard.css';

const ImageCard = () => {
  const [weddingData, setWeddingData] = useState([]);
  const { userId } = useParams(); // Use destructuring to get userId

  // Fetch wedding data from the API
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/weddings/');
        console.log('Route params:', { userId });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched wedding data:', data);

        setWeddingData(data);
      } catch (error) {
        console.error('Error fetching wedding data:', error);
      }
    };

    fetchWeddings();
  }, []);

  return (
    <div className="image-card-section">
      <h1>Which wedding would you like to join?</h1>
      <div className="image-card-grid">
        {weddingData.length > 0 ? (
          weddingData.map((wedding) => (
            <Link
              key={wedding._id}
              to={`/${userId}/wedding-details/${wedding._id}`} // Ensure proper route construction
              className="image-card-link"
            >
              <div className="image-card">
                <img
                  src={wedding?.preWeddingImages?.[0] || 'default-image.jpg'} // Use a fallback image if undefined
                  alt={`${wedding.brideName} & ${wedding.groomName}`}
                />
                <div className="image-card-content">
                  <h3>{`${wedding.brideName} & ${wedding.groomName}`}</h3>
                  <p>{`Location: ${wedding?.day1?.place || 'TBA'}`}</p>
                  <p className="date">{`Date: ${new Date(wedding?.day1?.date || '').toLocaleDateString()}`}</p>
                  <p className="date">{`Wedding Date: ${new Date(wedding?.day2?.date || '').toLocaleDateString()}`}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No weddings found.</p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
