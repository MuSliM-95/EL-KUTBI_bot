const TelegramApi = require('node-telegram-bot-api')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { key } = require('./bot_database/options')
const { telegramGroups } = require('./bot_database/data')
const { createOrder, orderGet, deleteOrderGet } = require('./bot_database/asyncFunction/orderAsync');
const { getBooks, getBooksLanguage, getBookId } = require('./bot_database/asyncFunction/booksAsync');
const { getProduct } = require('./bot_database/asyncFunction/otherProductsAsync');
const { createUser } = require('./bot_database/asyncFunction/userAsync');
const { patchBasket, getBasket, deleteBooksIsBasket } = require('./bot_database/asyncFunction/basketAsync');


require('dotenv').config()

let order = Boolean 
 
// Работа с MongoDB================>
const app = express()

app.use(express.json());

app.use(cors())

app.use(require('./site_database/dataRouts'))
// app.use('/imageBooks', express.static('imageBooks'));

mongoose.connect(process.env.MONGO_SERVER)
    .then(() => console.log('The server is started'))
    .catch(() => console.log('Server error MONGO'));

app.listen(process.env.PORT, () => {
    console.log(
        `The server is started successfully: http://localhost:${process.env.PORT}`
    );
});  
// ================================>
  


const bot = new TelegramApi(process.env.TOKEN, { polling: true })
const start = async () => {



    bot.setMyCommands([
        { command: '/start', description: 'Приветствие' },
    ])

    bot.on('message', async (msg) => {
        const { id } = msg.chat
        const { first_name, username } = msg.from;
        const { text } = msg;
        const { message_id } = msg;


        switch (text) {
            case '/start':
                await bot.sendMessage(id, telegramGroups.infoFunction(first_name), username === 'HeIIoW0RID' ? key().admin_keyboardСontainer : key().options);
                createUser(username)
                break
            case await getBookId(bot, id, text, username):
                break
            case 'Главное меню':
                await bot.sendMessage(id, 'Вы вернулись на главное меню', username === 'HeIIoW0RID' ? key().admin_keyboardСontainer : key().options);
                break
            case 'و عليكم السلام ورحمة الله وبركاته':
                await bot.sendMessage(id, 'Чем я могу вам помочь?')
                break
            case 'Доставка и цены':
                await bot.sendMessage(id, telegramGroups.deliveryAndPrices, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                })
                break
            case 'Книги':
                await getBooks(bot, id)
                break
            case 'Все книги':
                await getBooks(bot, id)
                break
            case 'Все товары':
                await bot.sendMessage(id, 'Выберите что вам нужно', key().all_products)
                break
            case 'Показать корзину':
                getBasket(bot, id, username)
                break
            case 'Язык: Арабский':
                await getBooksLanguage(id, text, bot)
                break
            case 'Язык: Русский':
                await getBooksLanguage(id, text, bot)
                break
            case 'Назад':
                await bot.sendMessage(id, 'Вы вернулись, на один шаг назад', key().all_products)
                break
            case 'Nefertari':
                await getProduct(bot, id)
                break 
            case 'Оформить заказ':
                order = true,
                    bot.sendMessage(id, telegramGroups.orderSample, {
                        parse_mode: 'HTML',
                    })
                // patchUser(username)
                break
            case 'Отменить заказ': 
                deleteOrderGet(username)

                break
            case 'Связаться с поддержкой':
                await bot.sendMessage(id, 'Подождите немного я отправлю уведомление как только освободится к вам, подойдет наш специалист', key().options.closeTheKeyboard)
                await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id)
                break
            case 'Закрыть помощник':
                await bot.sendMessage(id, 'Помощник закрыт!', key().options.closeTheKeyboard)
                break
            default:   

                if (username !== 'HeIIoW0RID') {
                    if (!order) {
                        await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id)
                    }

                } else
                    if (order) {
                        if (username !== 'HeIIoW0RID') {
                            await createOrder(username, text, id, bot)
                            // telegramGroups.orderFunction(bot, username, text, id)  
                            // order = false
                            await orderGet(bot, id, username)
                        }

                    }
                    else
                        if (msg.reply_to_message) {
                            if (username === 'HeIIoW0RID') {
                                if (msg.voice) {
                                    await bot.forwardMessage(msg.reply_to_message.forward_from.id, process.env.ADMIN_CHAT, message_id, { drop_author: false })
                                } else {
                                    await bot.sendMessage(msg.reply_to_message.forward_from.id, text)

                                }
                            }
                        }


                break

        }

    })

    bot.on('callback_query', async query  => {
        let data = JSON.parse(query.data)
        try {
            const { username } = query.from
            const { type, book } = data
            const {id} = query.message.chat
        
            if (type === 'ADD_BOOK') {
               await patchBasket(book, username, bot, id)
             await   bot.answerCallbackQuery({
                    callback_query_id: query.id,
                    text: 'Добавлено'
                })

            }
            else if (type === 'DELETE_BOOK') {
                // console.log(1);
             await   deleteBooksIsBasket(book, username, bot, id)
               await bot.answerCallbackQuery({
                    callback_query_id: query.id,
                    text: 'Удаленно'
                })
            }
            else if (type === 'BOOKS') {
                await getBooks(bot, id)
            }
        } catch (error) {
            console.log(error.message);
        }

    })
}
start()
