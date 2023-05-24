const Router = require("express");
const { userController } = require("../dataControllers/userControllers");

const router = Router();

router.post("/users", userController.userRegistrationController);
router.post("/users/login", userController.login);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.patch("/users/code", userController.codeActivation);
router.patch("/users/password", userController.addPassword);
router.patch("/users/info/:id", userController.patchUsers);
router.delete("/delete/users", userController.deleteUsers);

module.exports = router;