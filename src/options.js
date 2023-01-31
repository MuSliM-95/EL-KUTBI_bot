
module.exports = {

    keyboardСontainer: {

        parse_mode: "HTML",

        reply_markup: {
            keyboard: [
                [{ text: "و عليكم السلام ورحمة الله وبركاته" }],
                [{ text: "Доставка и цены" }],
                [{ text: "Оформить заказ" }],
                [{ text: "Связаться с поддержкой" }],
                [{ text: "Закрыть помощник" }],


            ]
        },
        closeTheKeyboard: {
            reply_markup: {
                remove_keyboard: true
            }
        }
    },
    admin_keyboardСontainer: {

        parse_mode: "HTML",

        reply_markup: {
            keyboard: [
                [{ text: "و عليكم السلام ورحمة الله وبركاته" }],
                [{ text: "Доставка и цены" }],
                [{ text: "Оформить заказ" }],
                [{ text: "Закрыть помощник" }],


            ]
        },
    }




}