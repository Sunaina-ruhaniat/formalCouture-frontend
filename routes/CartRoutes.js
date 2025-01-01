const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-cart", authMiddleware, CartController.getCart);
router.post("/add-to-cart", authMiddleware, CartController.addToCart);
router.put(
	"/decrease-from-cart",
	authMiddleware,
	CartController.decreaseFromCart
);
router.put("/remove-from-cart", authMiddleware, CartController.removeFromCart);

router.get("/guest/get-cart", CartController.getCart);
router.post("/guest/add-to-cart", CartController.addToCart);
router.put("/guest/remove-from-cart", CartController.removeFromCart);
router.put("/guest/decrease-from-cart", CartController.decreaseFromCart);

module.exports = router;
