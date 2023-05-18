const Router = require("express");
const { ProductController } = require("../dataControllers/productController");
const upload = require("../middleWares/upload");

const router = Router();

router.get("/products/:productType/:count", ProductController.getProducts);
router.post(
  "/products",
  upload.single("image"),
  ProductController.postProduct
);
router.patch("/products/:id", upload.single("image"), ProductController.patchProducts);

module.exports = router;
 