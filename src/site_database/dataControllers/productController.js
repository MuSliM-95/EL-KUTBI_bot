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
        arrayLength = await Product.find({ productType }).count();
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
      availability,
      firm,
      Author,
      productType,
    } = req.body;
    const product = (await Product.find()).length;
    try {
      const data = await Product.create({
        name,
        id: product + 1,
        country,
        language,
        price,
        quantity,
        availability,
        firm,
        Author,
        productType,
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
      console.log(req);
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
          // image: [] ,  
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
