const Router = require('express')
const {ProductController} = require('../dataControllers/productController')
const upload = require('../middleWares/upload')

const router = Router()

router.get('/products/:productType/:count', ProductController.getProducts)
router.post('/products/post', upload.single('image'),   ProductController.postProduct)

module.exports = router  