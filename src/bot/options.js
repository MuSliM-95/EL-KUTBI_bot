function key() {
  return (
    keyboardСontainer = {
    options: {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          [{ text: "و عليكم السلام ورحمة الله وبركاته" }],
          [{ text: "Доставка и цены" }],
          [
            {
              text: "Оформить заказ",
              web_app: { url: "https://el-kutbi-frontend.onrender.com/" },
            },
          ],
          [{ text: "Связаться с поддержкой" }], 
          [{ text: "Закрыть помощника" }],
        ],
      },
      closeTheKeyboard: {
        reply_markup: {
          remove_keyboard: true,
        },
      },
    },

    admin_keyboardСontainer: {
      parse_mode: "HTML",

      reply_markup: {
        keyboard: [
          [{ text: "و عليكم السلام ورحمة الله وبركاته" }],
          [{ text: "Доставка и цены" }],
          [{ text: "Закрыть помощника" }],
        ],
      },
    },

    chat_keyboard: {
      reply_markup: {
        keyboard: [
          [{text: "Завершить диалог"}]
        ]
      }
    }
  });
}

module.exports = { key };
