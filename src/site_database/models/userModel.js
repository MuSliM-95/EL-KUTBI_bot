const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
       type: String,
       unique: true
    },
    firstName: String,
    lastName: String,
    patronymic: String,
    data: Number,
    basketId: { 
        ref: "Basket",
        type: mongoose.SchemaTypes.ObjectId
    },

}) 

const User = mongoose.model('User', userSchema)

module.exports = User