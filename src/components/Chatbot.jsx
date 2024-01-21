import React, { useState, useEffect, useRef } from "react";
import "../assets/css/chatbot.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import femaleDoctor from "../assets/img/female-doctor.png";

function Chatbot({ isOpen, setIsOpen }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const apiUrl = "http://127.0.0.1:5000/chatbot";

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    const resizer = resizerRef.current;

    let startX, startY, startWidth, startHeight;

    const initDrag = (e) => {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(chatBox).width,
        10
      );
      startHeight = parseInt(
        document.defaultView.getComputedStyle(chatBox).height,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);

      document.body.classList.add("resizing");
    };

    const doDrag = (e) => {
      const width = startWidth + e.clientX - startX;
      const height = startHeight + e.clientY - startY;

      // set minimum and maximum dimensions
      const minWidth = 300;
      const minHeight = 400;
      const maxWidth = 600;
      const maxHeight = 600;

      if (width > minWidth && width < maxWidth) {
        chatBox.style.width = `${width}px`;
      }
      if (height > minHeight && height < maxHeight) {
        chatBox.style.height = `${height}px`;
      }
    };

    const stopDrag = () => {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);

      document.body.classList.remove("resizing");
    };

    resizer.addEventListener(
      "mousedown",
      (e) => {
        e.stopPropagation(); // prevent chatbox click event
        initDrag(e);
      },
      false
    );

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      resizer.removeEventListener("mousedown", initDrag, false);
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    };
  }, []); // Empty dependency array, so this runs only on mount and unmount

  const chatBoxRef = useRef();
  const resizerRef = useRef();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = "Hello! How can I assist you today?";
      const msg = { name: "Dr. Derma", message: greeting };
      setMessages((prevMessages) => [...prevMessages, msg]);
    }

    // Scroll to the bottom of the chatbox
    const chatbox = document.querySelector(".chatbox__messages");
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [isOpen, messages]);

  async function handleUserMessage(e) {
    e.preventDefault();
    e.stopPropagation();
    if (userInput.trim() === "") {
      return;
    }

    const userMessage = { name: "User", message: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setUserInput("");

    setIsTyping(true);

    setTimeout(async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
          const error = await response.text();
          console.log(error);
        } else {
          const responseData = await response.json();
          const chatbotMessage = {
            name: "Dr. Derma",
            message: responseData.response,
          };

          setIsTyping(false);

          // Add chatbot's response
          setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
        }
      } catch (error) {
        console.log("Fetch failed:", error);
      }
    }, 1000);
  }

  return (
    // <div className="container">
    <div
      className={`chatbox${isOpen ? " chatbox_active" : ""}`}
      // onClick={() => setIsOpen(!isOpen)}
      ref={chatBoxRef}
    >
      <div className="chatbox__header">
        <div className="chatbox__image_header">
          <img
            className="doctor-photo"
            src={femaleDoctor}
            alt="Doctor Picture"
          />
        </div>
        <div className="chatbox__content_header">
          <h4 className="chatbox__heading_header">Chat support</h4>
          <p className="chatbox__description_header">
            Hi. My name is Dr. Derma!
          </p>
        </div>
      </div>
      <div className="chatbox__messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`messages__item ${
              message.name === "User"
                ? "messages__item_visitor"
                : "messages__item_operator"
            }`}
          >
            {message.name === "User" ? (
              <div className="messages__item_visitor">{message.message}</div>
            ) : (
              <ReactMarkdown className="messages__item_operator">
                {message.message}
              </ReactMarkdown>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="messages__item messages__item_operator">
            <span className="typing-dot">...</span>
          </div>
        )}
      </div>
      <div className="chatbox__footer">
        <input
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          placeholder="Write a message..."
        />

        <button className="chatbox__send_footer" onClick={handleUserMessage}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      <div className="chatbox__resizer" ref={resizerRef}></div>
    </div>
    // </div>
  );
}

export default Chatbot;
