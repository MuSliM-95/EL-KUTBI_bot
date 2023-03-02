const Router = require('express')
const {BooksController} = require("../dataControllers/booksController")
const upload = require('../middleWares/upload')

const router = Router()

router.post('/books/post', upload.single('image'),   BooksController.addBooks)

module.exports = router