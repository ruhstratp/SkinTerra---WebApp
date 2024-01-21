import React from "react";
import errorImg from "../assets/img/errorimg.png";
import "../assets/css/error.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="error-container">
        <h1 className="error-title">Error 404</h1>
        <img src={errorImg} alt="Error" className="error-image" />
        <p className="error-text">Oops! Something went wrong.</p>
        <button className="error-button" onClick={goToHomePage}>
          Return to homepage
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
