import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/thankYou.css";

const ThankYou = () => {
  return (
    <>
      <Navbar />
      <div className="thankyou-page">
        <h1>Thank You for Shopping With Us!</h1>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="btn-return-home">
          Return to Homepage
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;
