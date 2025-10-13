const { uploadBase64ToFirebase, deleteFromFirebase } = require("../utils/helper");
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

module.exports.addProduct = async (req, res) => {

    try {
        const { productName, sku, category, subcategory, description, unitPrice, taxType, taxRate, minimumOrderQuantity, bulkPricing, status, mainImage, additionalImages } = req.body;

        if (unitPrice < 1 || minimumOrderQuantity < 1) {
            return res.status(400).json({ success: false, message: "Price, stock & MOQ should be greater than 0" });
        }

        if (!productName || !category || !unitPrice || !sku) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const productSku = sku.toLowerCase();

        const isProductExist = await productModel.findOne({ sku: productSku });

        if (isProductExist) {
            return res.status(400).json({ success: false, message: "This SKU is already exist" });
        }

        let mainImageUrl = "";
        let additionalImageUrls = [];

        // Handle main image
        if (mainImage && mainImage.url && mainImage.name) {
            mainImageUrl = await uploadBase64ToFirebase(mainImage.url, mainImage.name);
        }

        // Handle additional images
        if (Array.isArray(additionalImages)) {
            for (const img of additionalImages) {
                if (img.url && img.name) {
                    const url = await uploadBase64ToFirebase(img.url, img.name);
                    additionalImageUrls.push(url);
                }
            }
        }

        const product = await productModel.create({
            productName,
            sku: productSku,
            category,
            subcategory,
            description,
            unitPrice,
            taxRate,
            taxType,
            minimumOrderQuantity,
            bulkPricing,
            status,
            mainImage: mainImageUrl,
            additionalImages: additionalImageUrls
        })

        return res.status(200).json({ success: false, message: "Product created successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ status: false, message: "Product Id is required" });
        }

        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        // delete main image if exists
        if (product.mainImage) {
            await deleteFromFirebase(product.mainImage);
        }

        // delete additional images if exist
        if (product.additionalImages && product.additionalImages.length > 0) {
            for (const imgUrl of product.additionalImages) {
                await deleteFromFirebase(imgUrl);
            }
        }

        // finally, delete product record
        await productModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error.message);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

module.exports.updateProduct = async (req, res) => {

    try {

        const { _id, productName, category, subcategory, description, unitPrice, taxRate, taxType, minimumOrderQuantity, status } = req.body;

        if (
            !productName?.trim() ||
            !category?.trim() ||
            !subcategory?.trim() ||
            !unitPrice ||
            !taxRate ||
            !taxType ||
            !minimumOrderQuantity ||
            !description?.trim() ||
            !status?.trim()
        ) {
            return res.status(400).json({ status: false, message: "Some fields are blank" });
        }

        if (Number(unitPrice) <= 0) {
            return res.status(400).json({ status: false, message: "Unit price should be greater than 0" });
        }

        if (Number(minimumOrderQuantity) <= 0) {
            return res.status(400).json({ status: false, message: "MOQ should be greater than 0" });
        }

        const updateFields = {
            productName,
            category,
            unitPrice,
            taxRate,
            taxType,
            minimumOrderQuantity,
            description,
            status
        };

        const updatedProduct = await productModel.findByIdAndUpdate(
            _id,
            { $set: updateFields },   // only specific fields allowed
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        return res.status(200).json({ status: true, message: "Product update successfully" });
    } catch (err) {
        console.error("Delete product error:", err.message);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

module.exports.updateProductStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true }
        );

        if (!updateProduct) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        return res.status(200).json({ status: true, message: "Status update successful" });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find({}, { bulkPricing: 0, color: 0, material: 0, dimensions: 0, discount: 0, additionalImages: 0 });
        return res.status(200).json({ status: true, products });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Sever Error" });
    }
};

module.exports.newArrivals = async (req, res) => {
    try {
        const products = await productModel.find(
            {},
            { bulkPricing: 0, color: 0, material: 0, dimensions: 0, discount: 0, additionalImages: 0 },
            { limit: 12 }
        );
        return res.status(200).json({ status: true, products });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Sever Error" });
    }
};

module.exports.addToCart = async (req, res) => {
    try {
        const updatedCart = req.body.cart;

        let cart = await cartModel.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new cartModel({
                userId: req.user._id,
                items: updatedCart
            });
        } else {
            cart.items = updatedCart;
        }

        await cart.save();

        return res.status(200).json({ status: true, message: "Product Added to cart" });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};