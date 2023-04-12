const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    phoneNumber: {
    type: String,
    unique:true
    },
  password: String,
  userName:  String,
  code: String,
  firstName: String,
  lastName: String,
  patronymic: String,
  data: Number, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
