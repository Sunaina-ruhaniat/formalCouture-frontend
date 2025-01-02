const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				variant: {
					type: Object,
					default: {},
					// {size:"S",color:"Red",fit:"Slim"}
				},
			},
		],
	},
	{ timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
