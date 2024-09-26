import React from 'react';
import { Link } from 'react-router-dom';
import weddingData from '../../data/weddingData'; // Adjust the path based on the directory structure
import './ImageCard.css';

const ImageCard = () => {
  return (
    <div className="image-card-section">
      <h1>Which wedding would you like to join?</h1>
      <div className="image-card-grid">
        {weddingData.map((wedding, index) => (
          <Link 
            key={index} 
            to={`/wedding-details`}  // Redirect to weddingDetails with index as parameter
            className="image-card-link"
          >
            <div className="image-card">
              <img src={wedding.imgSrc} alt={wedding.title} />
              <div className="image-card-content">
                <h3>{wedding.title}</h3>
                <p>{wedding.location}</p>
                <p className="date">{wedding.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
