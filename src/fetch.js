const Order = require("./database/models/orderModel")
const { telegramGroups } = require("./data")
const {key} = require("./options")

// console.log(key);

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
// async function patchOrder(fullName) {
//     try {
//         const order = await Order.findByIdAndUpdate({ userName: username },{
//             fullName : fullName 

//         })

//     } catch (error) {
//         console.log(error.message);
//     }


// }
// patchOrder("dgsrdfgdgdf") 


async function orderGet(bot, id, username) {
    try {
        const data = await Order.findOne({ userName: username })
        // await bot.sendMessage(id, telegramGroups.orderFunction(username), {
        //     parse_mode: "HTML",
        //     disable_web_page_preview: true

        // })
        key(data, username)
        telegramGroups.orderFunction(bot, id, data)
    } catch (error) {
        console.log(error.message);
    }


}
async function deleteOrderGet(username) {
    try { 
        const data = await Order.remove({ userName: username })
        await bot.sendMessage(id, `<strong>Заказ удален</strong>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true

        })
       
      
       
    } catch (error) {
        console.log(error.message);
    }

 
}


// createOrder("Muhammad")
module.exports = { createOrder, orderGet, deleteOrderGet }
 