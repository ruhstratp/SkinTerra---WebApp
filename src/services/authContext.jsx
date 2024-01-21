import React, { createContext, useState } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  return (
    <AuthModalContext.Provider
      value={{
        showLoginModal,
        toggleLoginModal,
        showRegisterModal,
        toggleRegisterModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContext;
