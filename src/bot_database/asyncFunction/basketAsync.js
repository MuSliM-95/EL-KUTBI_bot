const Basket = require("../../site_database/models/basketModel");
const Books = require("../../site_database/models/booksModel");
const { telegramGroups } = require("../data");





async function patchBasket(book_id, userName, bot, id) {
    try {
        const basketUser = await Basket.findOneAndUpdate({ userName }, {
            $push: { basket: book_id }
        })
        getBasket(bot, id, userName)
    } catch (error) {
        console.log(error.message);
    }

}

async function deleteBooksIsBasket(book_id, userName, bot, id) {
    try {
        const basketUser = await Basket.findOne({ userName })
        const newBasket = basketUser.basket.filter(el => el.toString() !== book_id.toString())
         await Basket.findOneAndUpdate({ userName }, {
            basket: newBasket
        }, { new: true })
        getBasket(bot, id, userName)
    } catch (error) {
        console.log(error.message);
    }

}
async function getBasket(bot, id, userName) {
    try {
        const basketId = await Basket.findOne({ userName })
        const books = await Books.find()
        const basketBooks = await books.filter(el => {
            if (basketId.basket.indexOf(el._id) !== -1) {
                return el
            }
        })
        await bot.sendMessage(id, telegramGroups.getBasketHtml(basketBooks), { parse_mode: 'HTML' })
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = { patchBasket, getBasket, deleteBooksIsBasket }