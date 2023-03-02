const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    id: Number,
    country: {
        type: String,
        default: 'Египет'
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    firm: {
        type: String,
        default: 'Nefertari'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product