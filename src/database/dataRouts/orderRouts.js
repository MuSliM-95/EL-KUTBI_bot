const Router = require('express')
const {controller} = require("../dataControllers/orderController")

const router = Router()


router.post('/order', controller.orderPostController)
router.get('/', controller.orderGetController)
router.get('/order/:id', controller.orderGetByidController)
router.patch('/order/:id', controller.orderPatchController)
router.delete('/order/:id', controller.orderDeleteController)

module.exports = router  