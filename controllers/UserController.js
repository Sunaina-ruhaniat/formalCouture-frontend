const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.user = async (req, res) => {
	try {
		// const user = await User.findById(req.user._id).lean();

		return res.status(200).json({ user: req.user });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error, message: error?.message });
	}
};
