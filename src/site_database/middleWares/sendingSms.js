const Iqsms = require("iqsms");

require("dotenv").config();

const sendMessage = async (number, code) => {
 
  const iqsms = new Iqsms(process.env.SMS_LOGIN, process.env.SMS_PASSWORD);
  const message = new Iqsms.Message("1", number, `Ваш код регистрации в магазине EK-KUTBI ${code}`);

  message.setSender("City");

  await iqsms
    .send(message, function (err, data) {
      console.log(err, data); 
    })
    .finally(function (err, data) {
      console.log(err, data);
    });
}; 

module.exports = { sendMessage };
