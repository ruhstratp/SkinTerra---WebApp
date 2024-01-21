import React from "react";
import "../assets/css/orderSummaryCard.css";

const OrderSummaryCard = ({ title, value }) => {
  return (
    <div className="order-summary-card">
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
};

export default OrderSummaryCard;
