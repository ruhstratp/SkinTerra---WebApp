import React, { useContext } from "react";
import useAuth from "./useAuth";
import AuthModalContext from "../services/authContext";
import "../assets/css/allProducts.css";

const AddToCartButton = ({ product, quantity, onAddToCart, className }) => {
  const { loggedIn } = useAuth();
  const { toggleLoginModal } = useContext(AuthModalContext);

  const handleAddToCart = () => {
    if (!loggedIn) {
      toggleLoginModal();
    } else {
      onAddToCart(quantity);
    }
  };

  return (
    <button
      className={`bn39 ${className}`}
      type="button"
      onClick={handleAddToCart}
    >
      <span className="bn39span">Add to Bag &nbsp; &nbsp;{product.price}$</span>
    </button>
  );
};

export default AddToCartButton;
