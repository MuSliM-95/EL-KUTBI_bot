const Router = require('express')

const router = Router()


router.use(require('./orderRouts'))
router.use(require('./productsRouts'))
router.use(require('./userRouts'))



module.exports = router;    