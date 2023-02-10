const TelegramApi = require("node-telegram-bot-api")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { key } = require("./options")
const { telegramGroups } = require("./data")
const { createOrder, orderGet, deleteOrderGet } = require("./fetch")


require("dotenv").config()

let order = Boolean

// Работа с MongoDB================>
const app = express()

app.use(express.json());

app.use(cors())

app.use(require("./database/dataRouts"))

mongoose.connect(process.env.MONGO_SERVER)
    .then(() => console.log("The server is started"))
    .catch(() => console.log("Server error MONGO"));

app.listen(process.env.PORT, () => {
    console.log(
        `The server is started successfully: http://localhost:${process.env.PORT}`
    );
});
// ================================>



const bot = new TelegramApi(process.env.TOKEN, { polling: true })
const start = async () => {




    bot.setMyCommands([
        { command: "/start", description: "Приветствие" },
    ])

    bot.on("message", async (msg) => {
        const { id } = msg.chat
        const { first_name, username } = msg.from;
        const { text } = msg;
        const { message_id } = msg;


        const AdminChatId = -884026725

        // console.log(msg);
        switch (text) {
            case "/start":
                await bot.sendMessage(id, telegramGroups.infoFunction(first_name), username === "HeIIoW0RID" ? key().admin_keyboardСontainer : key().options);
                break

            case "و عليكم السلام ورحمة الله وبركاته":
                await bot.sendMessage(id, "Чем я могу вам помочь?")
                break
            case "Доставка и цены":
                await bot.sendMessage(id, telegramGroups.deliveryAndPrices, {
                    parse_mode: "HTML",
                    disable_web_page_preview: true
                })
                break
            case "Оформить заказ":
                order = true,
                bot.sendMessage(id, telegramGroups.orderSample, {
                    parse_mode: "HTML",
                }  )

                break
            case "Отменить заказ":
                deleteOrderGet(username)

                break
            case "Связаться с поддержкой":
                await bot.sendMessage(id, "Подождите немного я отправлю уведомление как только освободится к вам, подойдет наш специалист", key().options.closeTheKeyboard)
                await bot.forwardMessage(AdminChatId, id, message_id)
                break
            case "Закрыть помощник":
                bot.sendMessage(id, "Помощник закрыт!", key().options.closeTheKeyboard)
                break
            default:

                if (username !== "HeIIoW0RID") {
                    if (!order) {
                        await bot.forwardMessage(AdminChatId, id, message_id)
                    }

                } if (order) {
                    if (username !== "HeIIoW0RID") {
                        createOrder(username, text, id, bot)
                        // telegramGroups.orderFunction(bot, username, text, id)  
                        order = false
                        orderGet(bot, id, username)
                    }

                } 
                else
                    if (msg.reply_to_message) {
                        if (username === "HeIIoW0RID") {
                            if (msg.voice) {
                                await bot.forwardMessage(msg.reply_to_message.forward_from.id, AdminChatId, message_id, { drop_author: false })
                            } else {
                                await bot.sendMessage(msg.reply_to_message.forward_from.id, text)

                            }
                        }
                    }


                break

 


        }

    })
}
start()
