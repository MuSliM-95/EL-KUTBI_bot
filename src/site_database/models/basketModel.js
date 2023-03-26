const mongoose = require('mongoose')

const basketSchema = mongoose.Schema({
    userName: {
        type:String,
        unique: true
    },
    basket: [{
        ref: 'Product',
        type: mongoose.SchemaTypes.ObjectId
    }],

})

const Basket = mongoose.model('Basket', basketSchema)

module.exports = Basket