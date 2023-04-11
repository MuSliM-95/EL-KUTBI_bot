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
  favourites: [
    {
      ref: "Product",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
  basketId: {
    ref: "Basket",
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
