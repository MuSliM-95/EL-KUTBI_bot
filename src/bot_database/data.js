
module.exports = {

    telegramGroups: {
        infoFunction: function info(name) {
            return `
<strong>السلام عليكم ورحمة الله وبركاته ${name}</strong>

<strong>Мы приветствуем вас в онлайн магазине EL-KUTBI.</strong>

<em>У нас вы можете найти:</em>
<em>📖 Исламскую литературу на Арабском и Русском языках.</em>

<em>💄А так же натуральную уходовую косметику от египетской фирмы Nefertari.</em> 
    
    `
        },


        deliveryAndPrices: `
        <strong>Доставка</strong> 

<em>🚐 До Берката бесплатно</em>  

<em>Доставка с Берката до пункта назначения оплачиваете вы.</em> 

<em>✉️ Почтой России</em> 
<em>🚌 Маршрутка</em> 
<em>🗳️ Ваше предложение для доставки</em> 

<strong>Товар и цены</strong>

<em>С товаров и ценами вы можете ознакомиться в нашей группе</em> 

<em><a href="https://t.me/elkutbi">🔗 EL-KUTBI</a> </em> 
        `,

        orderSample:
            ` 
<strong>Заказ</strong> 

<strong>Ведите ваши данные таком формате ⬇️</strong>

<strong>
 Ф.И.О: <em> Архиев Магомед Хадидович,</em>
 Адрес: <i> Чеченская республика, Ачхой-мартановский район, село Самашки, улица магомадова 35.</i>
 Книги: <i>Исбату аль-хадди Лиллах,  Кашфу аш-Шубухат,</i>
  Прикрепить комментарии к заказу: <i>Пример</i></strong>
        
        `,


        orderFunction: async function order(data) {
            return `
         <strong>Заказ: <em>${data.userName}</em></strong>
         `
        },

        getBooksHtml: function getBooks(books) {
            const html = books.map(el => {
                console.log(el);
                return `/${el.id} <strong>Название:</strong> <em>${el.name}</em> <strong>Цена:</strong> <em>${el.price}р</em> <strong>Язык:</strong> ${el.language}`

            }).join('\n')
            return html
        },
        getBasketHtml: function getBasket(basketBooks) {

            const html = basketBooks.map(el => {
                return `<strong>Корзина</strong>\n/${el.id} <strong>Название:</strong> <em>${el.name}</em> <strong>Цена:</strong> <em>${el.price}р</em> <strong>Язык:</strong> ${el.language}`

            }).join('\n')
            return html
        },


        getBookHtml:  function getBook(book, basketUser) {

            let addDelete = 'Добавить в корзину'
            let TYPE = 'ADD_BOOK'
            basketUser.basket.map(el => {
                if (el._id.toString() === book._id.toString()) {
                    addDelete = 'Удалить из корзины'
                   return TYPE = 'DELETE_BOOK'
                    
                } else if(el._id.toString() !== book._id.toString()) {
                    console.log(1);
                    addDelete = 'Добавить в корзину'
                   return TYPE = 'ADD_BOOK'
                }
            })
          return  books = {
                parse_mode: 'HTML',
                caption: `<strong>Название:</strong> <em>${book.name}</em>\n<strong>Цена:</strong> <em>${book.price}р</em>\n<strong>Язык:</strong> ${book.language}`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: addDelete, callback_data: JSON.stringify({
                                    type: TYPE,
                                    book: book._id
                                })
                            }
                        ],
                        [
                            { text: '+', callback_data: '1' }, { text: '-', callback_data: '1' }
                        ]
                    ]
                }

            }
        
        },

        getProductsHtml: function getBooks(products) {
            const html = products.map(el => {
                `/${el.id} <strong>Название:</strong> <em>${el.name}</em> <strong>Цена:</strong> <em>${el.price}р</em> <strong>Страна:</strong> ${el.country} <strong>Фирма:</strong> <em>${el.firm}</em>`
            }).join('\n')
            return html
        }


    }
}
