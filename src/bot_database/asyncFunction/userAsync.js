const User = require('../../site_database/models/userModel');



async function createUser(userName) {
    try {
        await User.create({
            userName,
            basketId: basket._id
        })
    } catch (error) {
        console.log(error.message);
    }

}




module.exports = { createUser}