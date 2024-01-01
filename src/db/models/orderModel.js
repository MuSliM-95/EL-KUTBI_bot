const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
   userName: String,
   name: String,
   text: String,
   data: Number,
   chat: Number,
   basket: []
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order