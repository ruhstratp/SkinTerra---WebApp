const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
//  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  ml: { type: String, required: true },
  step: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  skinType: { type: String, required: true },
  shortDescription: { type: String, required: true },
  details: { type: String, required: true },
  usage: { type: String, required: true },
  ingredients: { type: String, required: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
