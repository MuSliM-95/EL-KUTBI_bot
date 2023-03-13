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

async function getBookId(bot, chatId, text, username){
    try {
        let str = /\/(.+)/.exec(text)[1]
        const book = await Books.findOne({id:str})
        const basketUser = await Basket.findOne({ username })
        await  bot.sendPhoto(chatId, book.imageSrc, telegramGroups.getBookHtml( book, basketUser))
        // console.log(book);
    } catch (error) {  
        console.log(error.message);
        
    }

} 
   
    
 
async function getBooksLanguage(id, text, bot) {
    try {
        let str
        if(text === 'Язык: Арабский' || text === 'Язык: Русский'){
            str = /: (.+)/.exec(text)[1];
        }
        const books = await Books.find({language: str})
        await bot.sendMessage(id, telegramGroups.getBooksHtml(books), str === 'Русский' && key().r_books_keyboard || str === 'Арабский' && key().a_books_keyboard  || key().books_keyboard)
     
    } catch (error) {
        throw Error(error.message)
    }
    
}


 
module.exports = { getBooks, getBooksLanguage, getBookId } 