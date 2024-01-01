const Router = require("express");
const { ProductController } = require("../controllers/productController");
const upload = require("../middlewares/upload");


const router = Router();

router.get("/products/:count", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductId)
router.post(
  "/products",
  upload.single("image"),
  ProductController.postProduct
);
router.patch("/products/:id", upload.single("image"), ProductController.patchProducts);

module.exports = router;
 