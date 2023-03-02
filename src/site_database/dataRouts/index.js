const Router = require('express')

const router = Router()


router.use(require('./orderRouts'))
router.use(require('./booksRouts'))
router.use(require('./productsRouts'))



module.exports = router;    