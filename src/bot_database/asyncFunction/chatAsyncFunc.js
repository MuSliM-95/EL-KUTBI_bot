const Chat = require("../../site_database/models/chatModel");

async function createChat(chatId) {
  try {
    const chat = await Chat.create({
      chatId,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function patchChat(chatId, activation) {
  try {
    const chat = await Chat.findOneAndUpdate(
      { chatId },
      {
        supportChat: activation,
      },
      { new: true }
    );

    const { supportChat } = chat;

    return supportChat;
  } catch (error) {
    console.log(error.message);
  }
}

async function getChat(chatId) {
  try {
    const chat = await Chat.findOne({ chatId });
    const { supportChat } = chat;
    return supportChat;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { createChat, patchChat, getChat };
