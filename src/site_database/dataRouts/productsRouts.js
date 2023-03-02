const Router = require('express')
const {ProductController} = require('../dataControllers/productController')
const upload = require('../middleWares/upload')

const router = Router()

// router.post('/products/post', upload.single('image'),   ProductController.postProduct)

module.exports = router