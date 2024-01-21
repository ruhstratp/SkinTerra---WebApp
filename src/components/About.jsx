import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Typewriter from "../services/typewriter";
import "../assets/css/about.css";
import meImage from "../assets/img/me.jpeg";

const AboutPage = () => {
  const paragraphs = [
    "Hello!",
    "My name is Patricia Ruhstrat and I am passionate about skincare.",
    "I started this business with the goal of helping people achieve healthy and beautiful skin. I believe that every person's skin is unique and therefore requires personalized attention.",
    "I work with my clients to identify their specific skin concerns and develop a skincare regimen that meets their needs and fits their lifestyle. My products are chosen to be simple yet effective, and tailored to each individual's needs.",
    "I believe that healthy skin is a journey, and I am committed to supporting my clients throughout their skincare journey.",
    "Thank you for choosing my skincare business to help you achieve your best skin. I am excited to work with you and help you feel confident and beautiful every day!",
  ];
  return (
    <>
      <Navbar />
      <div className="about-page-container">
        <img src={meImage} alt="Patricia Ruhstrat" className="profile-img" />
        <h1>About Me</h1>
        <div className="about-page-content about-page-content-card">
          <div className="line-text">
            <Typewriter paragraphs={paragraphs} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
