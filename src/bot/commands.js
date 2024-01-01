const TelegramApi = require("node-telegram-bot-api");
const { key } = require("./options");
const { telegramGroups } = require("./data");
const {
  createChat,
  patchChat,
  getChat,
} = require("./asyncFunction/chatAsyncFunc");

const start = async () => {
  const bot = new TelegramApi(process.env.TOKEN, { polling: true });

  bot.setMyCommands([{ command: "/start", description: "Приветствие" }]);

  bot.on("message", async (msg) => {
    const { id } = msg.chat;
    const { first_name, username } = msg.from;
    const { message_id, text } = msg;
    const chatId = msg?.reply_to_message?.forward_from.id;

    let support = await getChat(id);


    switch (text) {
      case "/start":
        await bot.sendMessage(
          id,
          telegramGroups.infoFunction(first_name),
          username === process.env.ADMIN
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

        if (support && username !== process.env.ADMIN) {
          await bot.forwardMessage(process.env.ADMIN_CHAT, id, message_id);
        }
        if (chatId && username === process.env.ADMIN) {
          await bot.copyMessage(chatId, process.env.ADMIN_CHAT, message_id);
        }
        break;
    }
  });
};

module.exports = start;
