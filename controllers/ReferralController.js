const Wallet = require("../models/WalletModel");
const Referral = require("../models/ReferralModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const { updateWalletBalance } = require("../controllers/WalletController");
exports.generateReferral = async (req, res) => {
	const { targetEntity } = req.body;

	if (!targetEntity) {
		return res.status(400).json({ error: "Missing targetEntity" });
	}
	try {
		if (targetEntity !== "refer") {
			const product = await Product.findOne({ productCode: targetEntity });
			if (!product) {
				return res
					.status(404)
					.json({ error: "Invalid productCode as targetEntity" });
			}
		}
		const userId = req.user._id;
		const username = req.user.username;
		const linkId = `${username}_${targetEntity}`;

		// Find an existing link or create a new one
		let referral = await Referral.findOne({ linkId });

		if (referral) {
			// Update expiration time
			referral.expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
			await referral.save();
		} else {
			// Create a new referral link
			referral = new Referral({
				linkId,
				createdBy: userId,
				targetEntity,
				expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
			});
			await referral.save();
		}

		res.status(201).json({
			link: `/referral/redeem-referral/${linkId}`,
			referral: referral,
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Failed to generate referral link", error: error });
	}
};

exports.redeemReferral = async (req, res) => {
	try {
		const userId = req.user._id;
		const { linkId } = req.params;
		const referral = await Referral.findOne({ linkId });

		if (!referral)
			return res
				.status(404)
				.json({ message: "Invalid or expired referral link" });
		if (referral.createdBy.toString() === userId.toString())
			return res
				.status(400)
				.json({ message: "Cannot redeem your own referral link" });
		if (referral.redeemedBy.includes(userId))
			return res
				.status(400)
				.json({ message: "You have already redeemed this referral link" });

		referral.redeemedBy.push(userId);
		await referral.save();

		// Update wallets
		const referrer = await User.findById(referral.createdBy);
		const referee = await User.findById(userId);

		if (!referrer || !referee) {
			return res.status(404).json({ error: "Referrer or referee not found" });
		}

		// Update balances
		await updateWalletBalance(referrer.wallet, "referralBalance", 5, referrer); // Referrer gets 10
		await updateWalletBalance(referee.wallet, "referralBalance", 10, referee); // Referee gets 5

		res.status(200).json({ message: "Referral redeemed successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Failed to redeem referral link", error: error });
	}
};
