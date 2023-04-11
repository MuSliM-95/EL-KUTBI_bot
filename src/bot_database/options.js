
function key() {


    return keyboardСontainer = {
        options: {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    [{ text: 'و عليكم السلام ورحمة الله وبركاته' }],
                    [{ text: 'Доставка и цены' }],
                    [{ text: 'Оформить заказ', web_app: {url:'https://dazzling-donut-b7cfda.netlify.app/'} }],
                    [{ text: 'Показать корзину' }],
                    [{ text: 'Связаться с поддержкой' }],
                    [{ text: 'Закрыть помощника' }]

                ]
            },
            closeTheKeyboard: {
                reply_markup: {
                    remove_keyboard: true
                }
            }
        }, 

        admin_keyboardСontainer: {
            parse_mode: 'HTML',
 
            reply_markup: {
                keyboard: [
                    [{ text: 'و عليكم السلام ورحمة الله وبركاته' }],
                    [{ text: 'Доставка и цены' }],
                    [{ text: 'Закрыть помощника' }],
                ]
            },


        },
     
    }


}


module.exports = { key }