const Books = require('../models/booksModel')

module.exports.BooksController = {

    addBooks: async (req, res) => {
        const { name, language, price, quantity} = req.body
        const { filename } = req.file
        const books = (await Books.find()).length
        try {
            const data = await Books.create({
                image: filename,
                imageSrc: req.file ? req.file.path : '',
                name,
                // id: books + 1,
                language,
                price,
                quantity

            })
            res.json(data)
        } catch (error) {
            res.json(error.message)
        }
    }







}