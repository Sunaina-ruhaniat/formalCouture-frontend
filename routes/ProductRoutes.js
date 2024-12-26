const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
	authMiddleware,
	adminMiddleware,
} = require("../middleware/authMiddleware");
const { uploadMiddleware } = require("../middleware/gridfsStorage");

router.post(
	"/create-product",
	authMiddleware,
	adminMiddleware,
	uploadMiddleware.array("images"),
	ProductController.createProduct
);
router.get("/get-products", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);

router.put(
	"/update-product/:id",
	authMiddleware,
	adminMiddleware,
	uploadMiddleware.array("images"),
	ProductController.updateProduct
);

router.delete(
	"/delete-product/:id",
	authMiddleware,
	adminMiddleware,
	ProductController.deleteProduct
);

module.exports = router;
