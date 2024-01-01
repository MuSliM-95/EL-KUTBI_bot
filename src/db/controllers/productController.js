const Product = require("../models/productModel");

module.exports.ProductController = {
  getProducts: async (req, res) => {
    try {
      const { count } = req.params;
      let arrayLength = await Product.find().count();
      let products = await Product.find().limit(Number(count));

      res.json({ products, arrayLength });
    } catch (error) {
      res.json(error.message);
    }
  },

  getProductId: async (req, res) => {
    try {
      const data = await Product.findById(req.params.id);
      res.json(data);
    } catch (error) {
      console.log(error);
    } 
  },

  postProduct: async (req, res) => {
    const { name, language, price, quantity, availability, Author } = req.body;
    const product = (await Product.find()).length;
    try {
      const data = await Product.create({
        name,
        id: product + 1,
        language,
        price,
        quantity,
        availability,
        Author,
      });
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },

  patchProducts: async (req, res) => {
    try {
      const { quantity, availability } = req.body;
      const { filename } = req.file;
      const { path } = req.file;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          quantity,
          availability,
          $push: {
            image: {
              image: filename,
              imageSrc: req.file ? path : "",
            },
          },
        },
        { new: true }
      );
      return res.json(product);
    } catch (error) {
      console.log(error.message);
      res.json(error.message);
    }
  },
};
