import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../services/cartContext";
import "../assets/css/navBar.css";
import "../assets/css/authModal.css";
import userIcon from "../assets/img/user-icon.svg";
import cartIcon from "../assets/img/shopping-cart.png";
import exitIcon from "../assets/img/log-out.png";
import AuthModal from "./AuthModal";
import useAuth from "../services/useAuth";

const Navbar = () => {
  const { cartQuantity } = useContext(CartContext);
  const { loggedIn, isAdmin } = useAuth();
  const [navLinks, setNavLinks] = useState([
    { to: "/products", text: "Products" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ]);

  useEffect(() => {
    const adminLinks = [
      { to: "/orders", text: "Orders" },
      { to: "/dashboard", text: "Dashboard" },
    ];

    setNavLinks((prevNavLinks) => {
      const newNavLinks = prevNavLinks.filter(
        (navLink) =>
          !adminLinks.find((adminLink) => adminLink.text === navLink.text)
      );
      if (isAdmin) {
        newNavLinks.push(...adminLinks); // adaugam toate linkurile de admin daca utilizatorul este administrator
      }
      return newNavLinks;
    });

    // console.log("isAdmin:", isAdmin);
  }, [isAdmin]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const goToShoppingCart = () => {
    window.location.href = "/cart";
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    window.location.reload(); // Reload the page to clear the state
  };

  const handleLoggedIn = (isAdminUser, token) => {
    localStorage.setItem("token", token);
    if (isAdminUser) {
      localStorage.setItem("isAdmin", "true");
    }
    window.location.reload(); // Reload the page to update the state
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="header-one">
          <NavLink className="navbar-brand  mx-auto" to="/">
            SkinTerra.
          </NavLink>
          {loggedIn && (
            <div className="header-icons">
              <button onClick={goToShoppingCart} className="cart-icon-button">
                <img src={cartIcon} alt="Cart Icon" />
                {cartQuantity > 0 && (
                  <span className="cart-quantity">{cartQuantity}</span>
                )}
              </button>
              <button onClick={handleLogOut} className="user-icon-button">
                <img src={exitIcon} alt="Exit Icon" />
              </button>
            </div>
          )}
          {!loggedIn && (
            <div className="header-icons">
              <button onClick={openAuthModal} className="user-icon-button">
                <img src={userIcon} alt="User Icon" />
              </button>
            </div>
          )}

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <hr className="line" size="8" width="100%" color="lightgrey"></hr>
        <div
          className={`collapse navbar-collapse ${
            showMenu ? "show" : ""
          } justify-content-center`}
        >
          <div className="navbar-nav">
            {navLinks.map((navLink) => (
              <NavLink
                className="nav-item nav-link"
                key={navLink.to}
                to={navLink.to}
                onClick={() => setShowMenu(false)}
              >
                {navLink.text}
              </NavLink>
            ))}
          </div>
          <div className="icons">
            {loggedIn && (
              <button onClick={goToShoppingCart} className="cart-icon-button">
                <img src={cartIcon} alt="Cart Icon" />
                {cartQuantity > 0 && (
                  <span className="cart-quantity">{cartQuantity}</span>
                )}
              </button>
            )}
            {loggedIn ? (
              <button onClick={handleLogOut} className="user-icon-button">
                <img src={exitIcon} alt="Exit Icon" />
              </button>
            ) : (
              <button onClick={openAuthModal} className="user-icon-button">
                <img src={userIcon} alt="User Icon" />
              </button>
            )}
          </div>
        </div>
        <hr className="line" size="8" width="100%" color="lightgrey"></hr>
      </nav>
      <AuthModal
        show={showAuthModal}
        onClose={closeAuthModal}
        onLoggedIn={handleLoggedIn}
      />
    </div>
  );
};

export default Navbar;
