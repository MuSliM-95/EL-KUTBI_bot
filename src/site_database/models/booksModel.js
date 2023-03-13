const mongoose = require('mongoose')

const booksSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
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
    
    language: {
        type: String,
        required: true
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
})

const Books = mongoose.model('Books', booksSchema)

module.exports = Books
