import React from "react";
import Modal from "react-modal";
import Auth from "./Auth";
import "../assets/css/authModal.css";
import { CSSTransition } from "react-transition-group";

Modal.setAppElement("#root");

const AuthModal = ({ show, onClose, onLoggedIn }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="auth-modal-transition"
      unmountOnExit
    >
      <div className="auth-modal">
        <div className="auth-modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {show && <Auth onLoggedIn={onLoggedIn} onClose={onClose} />}
        </div>
      </div>
    </CSSTransition>
  );
};

export default AuthModal;
