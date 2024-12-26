const Product = require("../models/ProductModel");
const multer = require("multer");

// Controller for creating a product
exports.createProduct = async (req, res) => {
	try {
		const { name, description, price, category, brand, stock, variants } =
			req.body;

		// Array to store image references
		let imageUrls = [];

		// Handle image uploads and store their references in GridFS
		if (req.files && req.files.length > 0) {
			for (const file of req.files) {
				// Construct URL for accessing the file through GridFS (example URL)
				const fileUrl = `/file/${file.filename}`; // Customize this URL based on how you serve files
				imageUrls.push(fileUrl);
			}
		}
		const product = await Product.create({
			name,
			description,
			price,
			category,
			brand,
			stock,
			variants: JSON.parse(variants || "[]"),
			images: imageUrls,
		});

		await product.save();
		res.status(201).json({ message: "Product created successfully", product });
	} catch (error) {
		handleError(error, res);
	}
};

// Controller for getting all products (paginated)
exports.getProducts = async (req, res) => {
	try {
		const { page = 1, limit = 10, category, brand } = req.query;

		const filters = {};
		if (category) filters.category = category;
		if (brand) filters.brand = brand;

		const products = await Product.find(filters)
			.skip((page - 1) * limit)
			.limit(parseInt(limit))
			.exec();

		const totalProducts = await Product.countDocuments(filters);
		res.status(200).json({
			products,
			totalProducts,
			currentPage: parseInt(page),
			totalPages: Math.ceil(totalProducts / limit),
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching products", error: error.message });
	}
};

// Controller for getting a single product
exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.status(200).json({ product: product });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching product", error: error.message });
	}
};

// Controller for updating a product
exports.updateProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			brand,
			stock,
			variants,
			removeImages,
		} = req.body;

		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		let imageUrls = product.images;

		// Remove specified images
		if (removeImages) {
			const imagesToRemove = JSON.parse(removeImages || "[]");
			imageUrls = imageUrls.filter((url) => !imagesToRemove.includes(url));
		}

		// Add new images from request
		if (req.files && req.files.length > 0) {
			for (const file of req.files) {
				const fileUrl = `/file/${file.filename}`;
				imageUrls.push(fileUrl);
			}
		}

		product.name = name || product.name;
		product.description = description || product.description;
		product.price = price || product.price;
		product.category = category || product.category;
		product.brand = brand || product.brand;
		product.stock = stock || product.stock;
		product.variants = JSON.parse(variants || "[]");
		product.images = imageUrls;

		await product.save();
		res.status(200).json({ message: "Product updated successfully", product });
	} catch (error) {
		handleError(error, res);
	}
};

// Controller for deleting a product
exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting product", error: error.message });
	}
};

// Common error handler
const handleError = (error, res) => {
	if (error instanceof multer.MulterError) {
		if (error.code === "LIMIT_FILE_SIZE") {
			return res
				.status(400)
				.json({ message: "File size exceeds limit of 10MB" });
		}
		return res
			.status(400)
			.json({ message: "File upload error", error: error.message });
	}
	res.status(500).json({ message: "An error occurred", error: error.message });
};
