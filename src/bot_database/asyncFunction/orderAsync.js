const Order = require('../../site_database/models/orderModel')
const { telegramGroups } = require('../data')
const { key } = require('../options')



async function createOrder(userName, text, chat) {
    try {
        const order = await Order.create({
            userName,
            text,
            chat,
            date: new Date().getTime()
        })

    } catch (error) {
        console.log(error.message);
    }

 
}



async function orderGet(bot, id, username) {
    try {
        const data = await Order.findOne({ userName: username })
        bot.sendMessage(id,  telegramGroups.orderFunction(data), key(data, username).options )
        
       
    } catch (error) {
        console.log(error.message);
    }


}
async function deleteOrderGet(username) {
    try {
         await Order.remove({ userName: username })
        await bot.sendMessage(id, `<strong>Заказ удален</strong>`, {
            parse_mode: 'HTML',
            disable_web_page_preview: true

        })


    } catch (error) {
        console.log(error.message);
    }


}


module.exports = { createOrder, orderGet, deleteOrderGet }
