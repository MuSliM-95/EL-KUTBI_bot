const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  username: String,
  first_name: String,
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
