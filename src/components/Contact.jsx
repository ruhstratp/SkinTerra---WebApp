import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/contact.css";
import contactImg from "../assets/img/contactPic.jpg";

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const response = await axios.post("/contact", {
        name,
        email,
        message,
      });
      if (response.status === 200) {
        setFormSubmitted(true);
      } else {
        alert("An error occurred while sending the email. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while sending the email. Please try again.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <h2>Contact Me</h2>
        <div className="contact-card">
          <div className="contact-image-container">
            <img
              src={contactImg}
              alt="A description of the image"
              className="contact-image"
            />
          </div>
          <div className="contact-form-container">
            <p>
              If you have any questions, please feel free to contact me using
              the form below:
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g: Jane Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g: jane.doe@gmail.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message to me ..."
                  required
                ></textarea>
              </div>
              {formSubmitted ? (
                <p>Thank you! Your message has been sent.</p>
              ) : (
                <button type="submit" className="submit-button">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
