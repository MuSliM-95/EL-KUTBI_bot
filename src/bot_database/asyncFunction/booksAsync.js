const Basket = require('../../site_database/models/basketModel')
const Books = require('../../site_database/models/booksModel')
const { telegramGroups } = require('../data')
const { key } = require('../options')




async function getBooks(bot, id) {
    try {
        const books = await Books.find()
        await bot.sendMessage(id, telegramGroups.getBooksHtml(books), key().books_keyboard)
    } catch (error) {
        console.log(error.message);
    }

}

async function getId(bot, id, text, username){
    try {
        const books = await Books.find()
        let str 
        const idBooks = await books.map(el => {
            if(`/${el.id}` === text){
                str = text
                getBooksId(bot, id, el.id, username)
            }
        })
        return str 
    } catch (error) {
        console.log(error.message);
    }

}


async function getBooksId(bot, chatId, id, username) {
    try {
        const basketUser = await Basket.findOne({ username })
        
        const book = await Books.findOne({id}) 
      await  bot.sendPhoto(chatId, book.imageSrc, telegramGroups.getBookHtml( book, basketUser))
    } catch (error) {
        console.log(error.message);
    }
    
}


async function getBooksLanguage(id, text, bot) {
    let str
    if(text === 'Язык: Арабский' || text === 'Язык: Русский'){
        str = /: (.+)/.exec(text)[1];
    }
    const books = await Books.find({language: str})
    await bot.sendMessage(id, telegramGroups.getBooksHtml(books), str === 'Русский' && key().r_books_keyboard || str === 'Арабский' && key().a_books_keyboard  || key().books_keyboard)

}


 
module.exports = { getBooks, getBooksId, getBooksLanguage, getId } 