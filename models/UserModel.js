const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Cart = require("../models/CartModel");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			// select:false,
		},
		image: {
			type: String,
		},
		cart: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cart",
		},
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password;
				return ret;
			},
		},
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// Pre-save hook to create a cart for the user if it doesn't exist
userSchema.pre("save", async function (next) {
	if (this.cart) return next();

	try {
		const newCart = await Cart.create({ user: this._id });
		this.cart = newCart._id;
		next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
