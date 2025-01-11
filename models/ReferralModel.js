const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
	linkId: { type: String, unique: true, required: true },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	targetEntity: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	expiresAt: { type: Date, required: true },
	redeemedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// TTL index to delete documents automatically after expiration
referralSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Referral", referralSchema);
