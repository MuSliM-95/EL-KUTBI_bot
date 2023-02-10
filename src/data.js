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

        orderFunction: function order(bot, id, data){
        //  let string = data.text.split(" ")
         console.log(data);
         bot.sendMessage(id, `
         <strong>Заказ: <em>${data.userName}</em></strong>

         ${data}
         `, {
            parse_mode: "HTML",
         }) 
        }

    }


} 

