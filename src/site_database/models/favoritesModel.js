const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
  favorites: [],
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
}); 

const Favorite = mongoose.model("Favorite", favoritesSchema);

module.exports = Favorite;
