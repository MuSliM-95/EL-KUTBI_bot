const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../middleWares/sendingSms");
const User = require("../models/userModel");
require("dotenv").config();

module.exports.userController = {
  userRegistrationController: async (req, res) => {
    try {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const { phoneNumber } = req.body;
      const user = await User.create({
        phoneNumber,
        code: code,
      });
      sendMessage(phoneNumber, code);
      return res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  codeActivation: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
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
      const payload = {
        id: user._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({ userId: payload.id, token });
    } catch (error) {
      return res.json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      const user = await User.findOne({ phoneNumber });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.staus(400).json("Неверный пароль");
      }
      const payload = {
        id: user._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({ userId: payload.id, token });
    } catch (error) {
      return res.json(error.message)
    
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
};
