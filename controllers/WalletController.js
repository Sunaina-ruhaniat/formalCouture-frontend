const Wallet = require("../models/WalletModel");
const User = require("../models/UserModel");

// Controller to get wallet details
exports.getWallet = async (req, res) => {
	try {
		const walletId = req.user.wallet;
		let wallet = await Wallet.findById(walletId);

		if (!wallet) {
			const newWallet = await Wallet.create({ user: req.user._id });
			req.user.wallet = newWallet._id;
			await req.user.save();
			wallet = newWallet;
		}

		res.status(200).json({ wallet: wallet });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch wallet" });
	}
};
exports.addExchange = async (req, res) => {
	const { amount, username } = req.body;
	try {
		const user = await User.findOne({ username: username });
		const walletId = user.wallet;
		let wallet = await Wallet.findById(walletId);

		if (!wallet) {
			const newWallet = await Wallet.create({ user: user._id });
			user.wallet = newWallet._id;
			await user.save();
			wallet = newWallet;
		}

		await this.updateWalletBalance(wallet._id, "exchangeBalance", amount, user);

		res
			.status(200)
			.json({ message: `added ammount ${amount} to ${user.username}` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch wallet" });
	}
};
exports.updateWalletBalance = async (walletId, balanceField, amount, user) => {
	const validFields = ["referralBalance", "exchangeBalance"];
	if (!validFields.includes(balanceField)) {
		throw new Error(`Invalid balance field: ${balanceField}`);
	}

	let wallet = await Wallet.findById(walletId);
	if (!wallet) {
		// throw new Error("Wallet not found");
		const newWallet = await Wallet.create({ user: user._id });
		user.wallet = newWallet._id;
		await user.save();
		wallet = newWallet;
	}

	wallet[balanceField] += amount;
	await wallet.save();
	return wallet;
};
