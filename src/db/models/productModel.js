const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: [],

  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: Number,
  language: String,

  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  availability: {
    type: Number,
    required: true,
    default: 0,
  },
  Author: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
