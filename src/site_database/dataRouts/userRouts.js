const Router = require("express")
const { check } = require("express-validator");
const { userController } = require("../dataControllers/userControllers")


const router = Router()

router.post('/users',  userController.userRegistrationController )
router.post('/users/login', userController.login)
router.get('/users',  userController.getUsers )
router.get('/user/:id', userController.getUser)
router.patch('/user/code', userController.codeActivation)
router.patch('/user/password', check("password").trim().not().isEmpty().isLength({ min: 6, max: 32 }),  userController.addPassword)
router.patch('/user/info/:id', userController.patchUsers)

module.exports = router  