const Basket = require('../../site_database/models/basketModel');
const Books = require('../../site_database/models/booksModel');
const User = require('../../site_database/models/userModel');
const { telegramGroups } = require('../data');


async function createUser(userName) {
    try {
        const basket =  await Basket.create({
            userName
        })
        await User.create({
            userName,
            basketId: basket._id
        })
    } catch (error) {
        console.log(error.message);
    }

}




module.exports = { createUser}