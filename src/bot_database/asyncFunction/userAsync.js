const Basket = require('../../site_database/models/basketModel');
const User = require('../../site_database/models/userModel');



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