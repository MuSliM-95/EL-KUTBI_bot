const Product = require("../models/productModel");

module.exports.ProductController = {
  getProducts: async (req, res) => {
    try {
      const { productType, count } = req.params;
      let products;
      let arrayLength;
      if (productType === "null") {
        arrayLength = await Product.find().count();
        products = await Product.find().limit(Number(count));
      }
      if (productType !== "null") {
        arrayLength = await Product.find({productType}).count();
        products = await Product.find({ productType }).limit(Number(count));
      }
      res.json({ products, arrayLength });
    } catch (error) {
      res.json(error.message);
    } 
  },

  postProduct: async (req, res) => {
    const {
      name,
      country,
      language,
      price,
      quantity,
      firm,
      Author,
      productType,
    } = req.body;
    const { filename } = req.file;
    const product = (await Product.find()).length;
    try {
      const data = await Product.create({
        image: filename,
        imageSrc: req.file ? req.file.path : "",
        name,
        id: product + 1,
        country,
        language,
        price,
        quantity,
        firm,
        Author,
        productType,
      });
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },
};
