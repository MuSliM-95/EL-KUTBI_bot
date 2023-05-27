const TelegramApi = require("node-telegram-bot-api");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { key } = require("./bot_database/options");
const { telegramGroups } = require("./bot_database/data");
const { orderGet } = require("./bot_database/asyncFunction/orderAsync");
const {
  createChat,
  patchChat,
  getChat,
} = require("./bot_database/asyncFunction/chatAsyncFunc");

require("dotenv").config();

// Работа с MongoDB================>

const port = process.env.PORT || 9090;
const app = express();

app.use(express.json());

app.use(cors());

app.use(require("./site_database/dataRouts"));
app.use(
  "/src/site_database/imageBooks",
  express.static("src/site_database/imageBooks")
);

// mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("The server is started"))
  .catch(() => console.log("Server error MONGO"));

app.listen(port, () => {
  console.log(`The server is started successfully: http://localhost:${port}`);
});
// ================================>

const bot = new TelegramApi(process.env.TOKEN, { polling: true });
const start = async () => {
  bot.setMyCommands([{ command: "/start", description: "Приветствие" }]);

  bot.on("message", async (msg) => {
    const { id } = msg.chat;
    const { first_name, username } = msg.from;
    const { text } = msg;
    const { message_id } = msg;
    let support = await getChat(id);

    switch (text) {
      case "/start":
        await bot.sendMessage(
          id,
          telegramGroups.infoFunction(first_name),
          username === "HeIIoW0RID"
            ? key().admin_keyboardСontainer
            : key().options
        );
        createChat(id, username, first_name);
        break;
      case "و عليكم السلام ورحمة الله وبركاته":
        await bot.sendMessage(id, "Чем я могу вам помочь?");
        break;
      case "Доставка и цены":
        await bot.sendMessage(id, telegramGroups.deliveryAndPrices, {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        });
        break;

      case "Связаться с поддержкой":
        await bot.sendMessage(
          id,
          "Подождите немного я отправлю уведомление как только освободится к вам, подойдет наш специалист",
          key().chat_keyboard
        );
        await patchChat(id, true);

        await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id);
        break;
      case "Завершить диалог":
        await bot.sendMessage(id, "Диалог завершен", key().options);
        support = await patchChat(id, false);

        await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id);
        break;
      case "Закрыть помощника":
        await bot.sendMessage(
          id,
          "Помощник закрыт!",
          key().options.closeTheKeyboard
        );
        break;
      default:
        console.log(msg);
        if (support && username !== "HeIIoW0RID") {
       return   await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id);
        }
        if (msg.reply_to_message.forward_from) {
         return await bot.sendMessage(
              msg.reply_to_message.forward_from.id,
            text
          );
        }
        if(msg.reply_to_message.chat){
        return  await bot.sendMessage(
            msg.reply_to_message.chat.id,
          text
        );
        }
        break;
    }
  });
};
start();
