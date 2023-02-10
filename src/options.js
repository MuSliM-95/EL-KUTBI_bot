
function key(data, username) {
    // let tex = data  ?   :  

    if(data) {
        tex = "Отменить заказ"
    } else {
        tex = "Оформить заказ"
    }
    console.log(data);
        return keyboardСontainer = {
            options: {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: [
                        [{ text: "و عليكم السلام ورحمة الله وبركاته" }],
                        [{ text: "Доставка и цены" }],
                        [{ text: tex }],
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
                            [{ text: "Закрыть помощник" }],
    
    
                        ]
                    },
                
    
    
    
            }
        }
   

}


module.exports = { key }