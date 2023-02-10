const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
   userName: String,
   text: String,
   data: Number,
   chat: Number


})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order