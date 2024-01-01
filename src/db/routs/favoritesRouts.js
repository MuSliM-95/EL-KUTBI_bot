const Router = require("express")
const {favoritesController} = require("../controllers/favoritesController")
const authMiddleWare = require("../middlewares/authMiddleware")

const router = Router()

router.get("/item/:id", authMiddleWare, favoritesController.getFavorites)
router.patch("/item/:id", authMiddleWare, favoritesController.addItems)
router.patch("/item/remove/:id", authMiddleWare, favoritesController.removeFavorites)

module.exports = router 