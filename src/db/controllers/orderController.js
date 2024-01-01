const Order = require("../models/orderModel");

module.exports.controller = {
  orderPostController: async (req, res) => {
    const { userName } = req.body;
    try {
      const res = await Order.create({
        userName,
        data: new Date().getTime(),
      });
    } catch (error) {
      res.json(error.message);
    }
  },

  orderPatchController: async (req, res) => {
    const { userName, fullName, address, books } = req.body;
    try {
      const data = await Order.findByIdAndUpdate(
        req.params.id,
        {
          userName,
          fullName,
          address,
          books,
        },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },
  
  orderGetController: async (req, res) => {
    try {
      const data = await Order.find();
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },

  orderGetByidController: async (req, res) => {
    try {
      const data = await Order.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },

  orderDeleteController: async (req, res) => {
    try {
      const data = await Order.findByIdAndRemove(req.params.id);
      res.json("Удаленно");
    } catch (error) {
      res.json(error.message);
    }
  },
};
