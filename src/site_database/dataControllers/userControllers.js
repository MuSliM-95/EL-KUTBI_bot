const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../middleWares/sendingSms");
const User = require("../models/userModel");
const Basket = require("../models/basketModel");
const Favorite = require("../models/favoritesModel");
require("dotenv").config();

module.exports.userController = {
  userRegistrationController: async (req, res) => {
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const { phoneNumber } = req.body;
      const user = await User.create({
        phoneNumber,
        code: code,
      });
      sendMessage(phoneNumber, code); 
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    } 
  },

  codeActivation: async (req, res) => {
    try {
      const {code, phoneNumber } = req.body;
      const userCode = await User.findOne({phoneNumber})
      if(code !== userCode.code) {
        return res.status(401).json({error: "Неверный код"});

      }
      const user = await User.findOneAndUpdate(
        { phoneNumber },
        {
          code: "verified",
        },
        { new: true }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },

  addPassword: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.findOneAndUpdate(
        { phoneNumber },
        {
          password: hash,
        },
        { new: true }
      );
      const basket = await Basket.create({
        userId: user._id,
      });
      const favorites = await Favorite.create({
        userId: user._id,
      });
      const payload = {
        id: user._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({ userId: payload.id, token });
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const user = await User.findOne({ phoneNumber });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({error: "Неверный пароль"});
      }
      const payload = {
        id: user._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).json({ userId: payload.id, token });
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      return res.json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      return res.json(error);
    }
  },

  patchUsers: async (req, res) => {
    try {
      const { contact, recipientNumber } = req.body;
      const { unrestricted_value } = req.body.name;
      const { value } = req.body.address;
      const { postal_code } = req.body.address.data;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: unrestricted_value,
          address: value,
          postal_code,
          contact,
          recipientNumber,
        },
        { new: true }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      const { userId, phoneNumber, password } = req.body;
      const user = await User.findOne({phoneNumber})
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.staus(400).json("Неверный пароль");
      }
      const userProfile = await User.findOneAndDelete({ phoneNumber });
      const userBasket = await Basket.findOneAndDelete({userId})
      const userFavorites = await Favorite.findOneAndDelete({userId})

      return res.json("Пользователь удален");
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },
};
