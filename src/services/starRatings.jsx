import React from "react";
import "../assets/css/starRating.css";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? "filled" : ""}`}
          onClick={() => onRatingChange(star)}
        >
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;
