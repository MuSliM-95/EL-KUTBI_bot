const Chat = require("../../db/models/chatModel");

async function createChat(chatId, username, first_name) {
  try {
    const chat = await Chat.create({
      chatId,
      username,
      first_name
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
