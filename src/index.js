const TelegramApi = require("node-telegram-bot-api")
const { admin_keyboardСontainer, keyboardСontainer } = require("./options")
const { telegramGroups } = require("./data")

require("dotenv").config()


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

        console.log(msg);
        switch (text) {
            case "/start":
                await bot.sendMessage(id, telegramGroups.infoFunction(first_name), username === "HeIIoW0RID" ? admin_keyboardСontainer : keyboardСontainer);
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
                await bot.sendMessage(id, telegramGroups.addOreder, {
                    parse_mode: "HTML",
                    disable_web_page_preview: true
                })
                break
            case "Связаться с поддержкой":
                await bot.sendMessage(id, "Подождите немного я отправлю уведомление как только освободится к вам, подойдет наш специалист", keyboardСontainer.closeTheKeyboard)
                await bot.forwardMessage(AdminChatId, id, message_id)
                break
            case "Закрыть помощник":
                bot.sendMessage(id, "Помощник закрыт!", keyboardСontainer.closeTheKeyboard)
                break
            default:

                if (username !== "HeIIoW0RID") {
                    await bot.forwardMessage(AdminChatId, id, message_id)
                }
                else
                    if (msg.reply_to_message.forward_from) {
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
