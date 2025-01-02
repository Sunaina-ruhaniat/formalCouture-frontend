const Wishlist = require("../models/WishlistModel");
const Product = require("../models/ProductModel");

const getSessionWishlist = (req) => {
	// Return the session wishlist if available, else create a new one
	if (!req.session.wishlist) {
		req.session.wishlist = { products: [] };
	}
	return req.session.wishlist;
};

const getWishlist = async (req, res) => {
	try {
		if (req.user) {
			// For logged-in users, retrieve the wishlist using the wishlist ID stored in the user
			const wishlist = await Wishlist.findById(req.user.wishlist).populate(
				"products.product"
			);
			return res.status(200).json({ wishlist: wishlist || { products: [] } });
		} else {
			// For guests, retrieve the wishlist from session
			const wishlist = getSessionWishlist(req);
			return res.status(200).json({ wishlist });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error fetching wishlist", error: error.message });
	}
};

const addToWishlist = async (req, res) => {
	try {
		const { productId, variant } = req.body;

		// Get the product data (including variants) from the database
		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Check if the variant is available in the product's options
		const { size, color, fit } = variant;

		// Validate variant properties
		if (
			(size && !product.sizes.includes(size)) ||
			(color && !product.colors.includes(color)) ||
			(fit && !product.fits.includes(fit))
		) {
			return res
				.status(400)
				.json({ message: "Selected variant is not available" });
		}

		if (req.user) {
			// For logged-in users, update the user's wishlist
			let wishlist = await Wishlist.findById(req.user.wishlist);

			if (!wishlist) {
				wishlist = new Wishlist({ user: req.user._id, products: [] });
				req.user.wishlist = wishlist._id; // Assign new wishlist to the user
				await req.user.save();
			}

			const existingProduct = wishlist.products.find(
				(item) =>
					item.product.toString() === productId &&
					JSON.stringify(item.variant) === JSON.stringify(variant)
			);

			if (existingProduct) {
				return res.status(400).json({ message: "Product already in wishlist" });
			}

			// Add the new product to the wishlist
			wishlist.products.push({
				product: productId,
				variant,
			});

			await wishlist.save();
			wishlist = await Wishlist.findById(req.user.wishlist).populate(
				"products.product"
			);
			// wishlist = wishlist.populate("products.product");
			return res.status(200).json({ wishlist });
		} else {
			// For guests, use the session wishlist
			const wishlist = getSessionWishlist(req);

			const existingProduct = wishlist.products.find(
				(item) =>
					item.product._id === productId &&
					JSON.stringify(item.variant) === JSON.stringify(variant)
			);

			if (existingProduct) {
				return res.status(400).json({ message: "Product already in wishlist" });
			}

			// Add the new product (full product details) to the session wishlist
			wishlist.products.push({
				product,
				variant,
			});

			return res.status(200).json({ wishlist });
		}
	} catch (error) {
		return res.status(500).json({
			message: "Error adding product to wishlist",
			error: error.message,
		});
	}
};

const removeFromWishlist = async (req, res) => {
	try {
		const { productId, variant } = req.body;

		if (req.user) {
			// For logged-in users, remove the product from the wishlist
			let wishlist = await Wishlist.findById(req.user.wishlist);

			if (!wishlist) {
				return res.status(400).json({ message: "Wishlist not found" });
			}

			wishlist.products = wishlist.products.filter(
				(item) =>
					!(
						item.product.toString() === productId &&
						JSON.stringify(item.variant) === JSON.stringify(variant)
					)
			);

			await wishlist.save();
			wishlist = await Wishlist.findById(req.user.wishlist).populate(
				"products.product"
			);
			// wishlist = wishlist.populate("products.product");
			return res.status(200).json({ wishlist });
		} else {
			// For guest users, remove the product from the session wishlist
			const wishlist = getSessionWishlist(req);

			wishlist.products = wishlist.products.filter(
				(item) =>
					!(
						item.product._id === productId &&
						JSON.stringify(item.variant) === JSON.stringify(variant)
					)
			);

			return res.status(200).json({ wishlist });
		}
	} catch (error) {
		return res.status(500).json({
			message: "Error removing product from wishlist",
			error: error.message,
		});
	}
};

const mergeWishlist = async (req, res, user) => {
	try {
		const sessionWishlist = getSessionWishlist(req); // Get the session wishlist (guest wishlist)
		if (!sessionWishlist || sessionWishlist.products.length === 0) {
			return; // If there are no products in the session wishlist, no need to merge
		}

		// Find the user's wishlist in the database
		let wishlist = await Wishlist.findById(user.wishlist);

		if (!wishlist) {
			// If user doesn't have a wishlist, create one
			wishlist = new Wishlist({ user: user._id, products: [] });
			user.wishlist = wishlist._id;
			await user.save();
		}

		// Loop through each product in the session wishlist
		for (let sessionProduct of sessionWishlist.products) {
			const { product: sessionProductDetail, variant } = sessionProduct;
			const productId = sessionProductDetail._id;
			// Check if the product already exists in the user's wishlist
			const existingProduct = wishlist.products.find(
				(item) =>
					item.product.toString() === productId &&
					JSON.stringify(item.variant) === JSON.stringify(variant)
			);

			if (!existingProduct) {
				// Only add the product if it doesn't exist in the user's wishlist
				wishlist.products.push({
					product: productId,
					variant,
				});
			}
		}

		// Save the merged wishlist to the database
		await wishlist.save();

		// Clear the session wishlist after merging
		req.session.wishlist = { products: [] };
	} catch (error) {
		console.error("Error merging wishlist:", error);
	}
};

module.exports = {
	getWishlist,
	addToWishlist,
	removeFromWishlist,
	mergeWishlist,
};
