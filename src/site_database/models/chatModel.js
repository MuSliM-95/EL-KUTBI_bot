const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  supportChat: {
    type: Boolean,
    default: false,
  },
  chatId: {
    type: String,
    unique: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
