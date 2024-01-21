import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../services/cartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/shoppingCart.css";

const ShoppingCart = (props) => {
  const { cart, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  const handleQuantityChange = (event, product) => {
    const newQuantity = parseInt(event.target.value, 10);
    updateCartItemQuantity(product, newQuantity);
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {/* <h1>Your Shopping Cart:</h1> */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>
              Your cart is empty. <Link to="/products">Shop now</Link>.
            </p>
          </div>
        ) : (
          <>
            <h1>Your Shopping Cart:</h1>
            <div className="cart-content">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-item">
                          <img
                            src={require(`../assets/img/${item.image}`)}
                            alt={item.name}
                          />

                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            handleQuantityChange(event, item)
                          }
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-summary">
                <p>Total: ${calculateTotalPrice()}</p>
                <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
