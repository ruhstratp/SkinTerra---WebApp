import React, { createContext, useState, useEffect } from "react";
import useAuth from "./useAuth";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { loggedIn, isAdmin } = useAuth();
  const userId = loggedIn ? localStorage.getItem("userId") : "guest"; // Fetch user ID from local storage, or use 'guest' if not logged in

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, [userId]);

  const addToCart = (product, quantity) => {
    let updatedCart = [...cart];
    const itemInCart = updatedCart.find((item) => item.id === product.id);

    if (itemInCart) {
      updatedCart = updatedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...updatedCart, { ...product, quantity: quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    console.log("Cart after adding a product:", updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(`cart_${userId}`);
  };

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const updateCartItemQuantity = (product, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        cartQuantity,
        cartTotal,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
