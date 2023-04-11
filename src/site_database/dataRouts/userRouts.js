const Router = require("express")
const { userController } = require("../dataControllers/userControllers")


const router = Router()

router.post('/users',  userController.userRegistrationController )
router.get('/users',  userController.getUsers )

module.exports = router 