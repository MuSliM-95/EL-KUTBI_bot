const Basket = require("../models/basketModel");

module.exports.basketController = {
  patchBasket: async (req, res) => {
    try {
      const { basketArray } = req.body;
      const basketUser = await Basket.findOne({ userId: req.params.id });

      const userBasket = await Basket.findOneAndUpdate(
        { userId: req.params.id },
        {
          basket: basketArray, 
          // basket: [] 
        },
        { new: true }
      );
      return res.json(userBasket);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }  
  },
  
  getBasket: async (req, res) => { 
    try {
      const basket = await Basket.findOne({ userId: req.params.id });
      return res.json(basket);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },
};
