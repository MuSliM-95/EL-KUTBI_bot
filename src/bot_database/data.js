module.exports = {
  telegramGroups: {
    infoFunction: function (name) {
      return `
<strong>السلام عليكم ورحمة الله وبركاته ${name}</strong>

<strong>Мы приветствуем вас в онлайн магазине EL-KUTBI.</strong>

<em>У нас вы можете найти:</em>
<em>📖 Исламскую литературу на Арабском и Русском языках.</em>

<em>💄А так же натуральную уходовую косметику от египетской фирмы Nefertari.</em> 
    
    `;
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
  },

  supportChat: async function (msg, support, username, bot) {
    const {
        message_id,
        text,
        photo,
        voice,
        video,
        document,
        contact,
        location,
        poll
      } = msg;
      const {id} = msg.chat
      
      if (support && username !== "HeIIoW0RID") {

        return await bot.forwardMessage(
          process.env.ADMIN_CHAT,
          id,
          message_id
        );
      }

      if (
        msg.reply_to_message.forward_from &&
        !photo &&
        !voice &&
        !video &&
        !document &&
        !contact &&
        !location && 
        !poll
      ) {

        return await bot.sendMessage(
          msg.reply_to_message.forward_from.id,
          text
        );
      }

      if (photo && msg.reply_to_message.forward_from) {
        return await bot.sendPhoto(
          msg.reply_to_message.forward_from.id,
          photo[0].file_id
        );
      }

      if (
        msg.reply_to_message.chat &&
        msg.reply_to_message.chat.id !== Number(process.env.ADMIN_CHAT)
      ) {
        return await bot.sendMessage(msg.reply_to_message.chat.id, text);
      }

      if (voice && msg.reply_to_message.forward_from) {
        return await bot.sendVoice(
          msg.reply_to_message.forward_from.id,
          msg.voice.file_id,
          { duration: msg.voice.duration }
        );
      }

      if (video && msg.reply_to_message.forward_from) {
        return await bot.sendVideo(
          msg.reply_to_message.forward_from.id,
          video.file_id,
          { duration: video.duration }
        );
      }

      if (document && msg.reply_to_message.forward_from) {
        return await bot.sendDocument(
          msg.reply_to_message.forward_from.id,
          document.file_id
        );
      }

      if (contact && msg.reply_to_message.forward_from) {
        return await bot.sendContact(
          msg.reply_to_message.forward_from.id,
          contact.phone_number,
          contact.first_name,
          contact.last_name
        );
      }
      
      if (location && msg.reply_to_message.forward_from) {
        return await bot.sendLocation(
          msg.reply_to_message.forward_from.id,
          location.latitude,
          location.longitude
        );
      }


  }
};
