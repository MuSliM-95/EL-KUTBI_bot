const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../middleWares/sendingSms");
const User = require("../models/userModel");

module.exports.userController = {
  userRegistrationController: async (req, res) => {
    try {
      const code = Math.floor(Math.random() * 9000).toString();
      const { phoneNumber } = req.body;
      //   const hash = await bcrypt.hash(
      //     password,
      //     Number(process.env.BCRYPT_ROUNDS)
      //   );
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
      const user = await User.findOneAndUpdate( { phoneNumber },
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

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log({ error: error.message });
      return res.json(error);
    }
  },
};
