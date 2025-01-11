const express = require("express");
const router = express.Router();
const WalletController = require("../controllers/WalletController");
const {
	authMiddleware,
	adminMiddleware,
} = require("../middleware/authMiddleware");

router.get("/get-wallet", authMiddleware, WalletController.getWallet);
router.post(
	"/add-exchange",
	authMiddleware,
	adminMiddleware,
	WalletController.addExchange
);

module.exports = router;
