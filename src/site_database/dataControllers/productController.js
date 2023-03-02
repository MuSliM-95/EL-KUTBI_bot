const Product = require('../models/productModel')


module.exports.ProductController = {
    postProduct: async (req, res) => {
        const { name, country, price, quantity } = req.body
        const { filename } = req.file
        const product = (await Product.find()).length
        try {
            const data = await Product.create({
                image: filename,
                imageSrc: req.file ? req.file.path : '',
                name,
                id: product + 1,
                country,
                price,
                quantity

            })
            res.json(data)
        } catch (error) {
            res.json(error.message)
        }
    }
}