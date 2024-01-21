import React, { useState, useEffect } from "react";

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupVisited = localStorage.getItem("popupVisited");
    if (!popupVisited) {
      setShowPopup(true);
      localStorage.setItem("popupVisited", true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="newsletter-popup">
          <h3>Subscribe to our newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <button className="close-button" onClick={handleClosePopup}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;
