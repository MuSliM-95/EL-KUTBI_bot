
function key(data, username) {


    return keyboardСontainer = {
        options: {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    [{ text: 'و عليكم السلام ورحمة الله وبركاته' }],
                    [{ text: 'Доставка и цены' }],
                    [{ text: 'Все товары' }],
                    [{ text: 'Показать корзину' }],
                    [{ text: 'Связаться с поддержкой' }],
                    [{ text: 'Закрыть помошника' }]

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
                    [{ text: 'Все товары' }],
                    [{ text: 'Закрыть помощник' }],


                ]
            },


        },
        all_products: {
            parse_mode: 'HTML',

            reply_markup: {
                keyboard: [
                    [{ text: 'Книги' }, { text: 'Nefertari' }],
                    [{ text: 'Главное меню' }]
                ]
            }
        },
        books_keyboard: {
            parse_mode: 'HTML',

            reply_markup: {
                keyboard: [
                    [{ text: 'Язык: Арабский' }],
                    [{ text: 'Язык: Русский' }],
                    [{ text: 'Все книги' }],
                    [{ text: 'Показать корзину' }],
                    [{ text: 'Назад' }]
                ]
            }
        },
        r_books_keyboard: {
            parse_mode: 'HTML',

            reply_markup: {
                keyboard: [
                    [{ text: 'Язык: Арабский' }],
                    [{ text: 'Все книги' }],
                    [{ text: 'Показать корзину' }],
                    [{ text: 'Назад' }]
                ]
            }
        },
        a_books_keyboard: {
            parse_mode: 'HTML',

            reply_markup: {
                keyboard: [
                    [{ text: 'Язык: Русский' }],
                    [{ text: 'Все книги' }],
                    [{ text: 'Показать корзину' }],
                    [{ text: 'Назад' }]
                ]
            }
        },
        products_keyboard: {
            parse_mode: 'HTML',

            reply_markup: {
                keyboard: [
                    [{ text: 'Назад' }]
                ]
            }
        }
    }


}
 

module.exports = { key }