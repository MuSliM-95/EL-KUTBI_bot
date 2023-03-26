const Basket = require("../../site_database/models/basketModel");
const Product = require("../../site_database/models/productModel");
const { telegramGroups } = require("../data");





async function getBasket(bot, id, userName) {
    try {
        const basketId = await Basket.findOne({ userName })
        const products = await Product.find()
        const basketProducts = await products?.filter(el => {
            if (basketId.basket.indexOf(el._id) !== -1) {
                return el
            }
        })
        await bot.sendMessage(id, telegramGroups.getBasketHtml(basketProducts), { parse_mode: 'HTML' })
    } catch (error) {
        throw Error(error.message)
    }

}

module.exports = { getBasket }