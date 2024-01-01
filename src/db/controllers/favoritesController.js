const Favorite = require("../models/favoritesModel");

module.exports.favoritesController = {
  addItems: async (req, res) => {
    try {
    
      const { item } = req.body;
      const favorite = await Favorite.findOneAndUpdate(
        { userId: req.params.id },
        {
          $push: { favorites: item },
        },
        { new: true }
      );
      return res.json(favorite); 
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    } 
  },

  removeFavorites: async (req, res) => {  
    try {
      const { item } = req.body;
      const favoriteArr = await Favorite.findOne({ userId: req.params.id });
      const newArray = favoriteArr.favorites.filter(
        (el) => el._id !== item._id
      );
      const favorite = await Favorite.findOneAndUpdate(
        { userId: req.params.id },
        {
          favorites: newArray,
        },
        { new: true }
      );
      return res.json(favorite);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message); 
    }
  },
  
  getFavorites: async (req, res) => {
    try {
      const favorite = await Favorite.findOne({ userId: req.params.id });
      return res.json(favorite);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },
};
