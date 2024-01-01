const Router = require("express")
const {basketController} =  require("../controllers/basketController")
const authMiddleWare = require("../middlewares/authMiddleware")

const router = Router()

router.patch("/basket/:id", authMiddleWare,  basketController.patchBasket)
router.get("/basket/:id", basketController.getBasket)

module.exports = router 