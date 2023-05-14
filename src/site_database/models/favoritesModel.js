const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
  favorites: [],
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
}); 

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
