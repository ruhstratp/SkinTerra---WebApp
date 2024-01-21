const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    streetAddress: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 paymentMethod: {
    type: String,
    required: true
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
