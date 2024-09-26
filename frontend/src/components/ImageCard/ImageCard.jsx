import React from 'react';
import './ImageCard.css';

const ImageCard = ({ imgSrc, title, location, date }) => {
  return (
    <div className="image-card-section">
      <h1>Which wedding would you like to join?</h1> {/* Heading moved here */}
      <div className="image-card">
        <img src={imgSrc} alt={title} />
        <div className="image-card-content">
          <h3>{title}</h3>
          <p>{location}</p>
          <p className="date">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
