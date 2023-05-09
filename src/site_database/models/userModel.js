const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
  },
  password: String,
  userName: String,
  code: String,
  name: String,
  surname:String,
  patronymic:String,
  address: String,
  data: Number,
  postal_code: Number,
  contact: String,
  messengers: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
