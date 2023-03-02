const Product = require('../../site_database/models/productModel')
const { telegramGroups } = require('../data');
const { key } = require('../options');


async function getProduct(bot, id,) {
    try {
        const products = await Product.find() 
        console.log(products);
await bot.sendMessage(id, telegramGroups.getProductsHtml(products), key().products_keyboard )
    } catch (error) {
        console.log(error.message);
    }
    
    
}

module.exports = {getProduct}