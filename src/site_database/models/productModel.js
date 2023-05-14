const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
    unique: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: Number,
  country: String,
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
  firm: String,
  Author: String,
  productType: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
