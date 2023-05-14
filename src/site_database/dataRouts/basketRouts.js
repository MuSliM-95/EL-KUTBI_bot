const Router = require("express")
const {basketController} =  require("../dataControllers/basketContainer")
const authMiddleWare = require("../middleWares/authMiddleWare")

const router = Router()

router.patch("/basket/:id", authMiddleWare,  basketController.patchBasket)
router.get("/basket/:id", basketController.getBasket)

module.exports = router 