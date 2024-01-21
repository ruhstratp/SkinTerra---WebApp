import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../services/cartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
import PayPalButton from "./PayPalButton";
import generateInvoiceHtml from "./InvoiceHtml";
import "../assets/css/checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);

  useEffect(() => {
    const handlePayPalLoad = () => {
      setPaypalScriptLoaded(true);
    };

    if (window.paypal) {
      setPaypalScriptLoaded(true);
    } else {
      window.addEventListener("paypal-script-load", handlePayPalLoad);
    }

    return () => {
      window.removeEventListener("paypal-script-load", handlePayPalLoad);
    };
  }, []);

  const calculateTotalPrice = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const placeOrder = async (userData) => {
    try {
      const response = await axios.post("/api/orders", {
        user: userData,
        items: cart,
        total: calculateTotalPrice(),
        paymentMethod: paymentMethod,
      });

      // Generate the invoice HTML
      const invoiceHtml = generateInvoiceHtml(response.data);
      console.log(invoiceHtml);

      return response.data;
    } catch (error) {
      return <ErrorPage />;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod === "paypal" && !paymentCompleted) {
      alert("Please complete the PayPal payment before placing your order.");
      return;
    }

    const userData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      streetAddress: event.target.streetAddress.value,
      country: event.target.country.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
    };

    console.log("User data:", userData);
    console.log("Cart:", cart);
    console.log("Total:", calculateTotalPrice());

    try {
      const order = await placeOrder(userData);
      if (paymentMethod === "paypal") {
        setSubmitting(true);
      } else {
        navigate(`/thankyou`);
      }
      await clearCart(); // Clear the cart after a successful order
    } catch (error) {
      console.error("Error:", error);
      return <ErrorPage />;
    }
  };

  const handlePaymentSuccess = async (order) => {
    setPaymentCompleted(true);
    await placeOrder();
    await clearCart(); // Clear the cart after a successful payment
    navigate(`/thankyou`);
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="checkout-form">
            <div className="form-row">
              <label htmlFor="firstName">First Name</label>
              <input
                className="checkout-text"
                type="text"
                id="firstName"
                name="firstName"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="checkout-text"
                type="text"
                id="lastName"
                name="lastName"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email Address</label>
              <input
                className="checkout-email"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                className="checkout-text"
                type="text"
                id="streetAddress"
                name="streetAddress"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="country">County</label>
              <input
                className="checkout-text"
                type="text"
                id="country"
                name="country"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="city">City</label>
              <input
                className="checkout-text"
                type="text"
                id="city"
                name="city"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                className="checkout-text"
                type="text"
                id="postalCode"
                name="postalCode"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="cash">Cash</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {paymentMethod === "paypal" && paypalScriptLoaded && (
              <div className="paypal-button-container">
                <PayPalButton
                  total={calculateTotalPrice()}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </div>

          <button
            className="checkout-btn"
            type="submit"
            disabled={paymentMethod === "paypal" && !paymentCompleted}
          >
            Place Order
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
