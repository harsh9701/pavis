const { uploadBase64ToFirebase } = require("../utils/helper");
const productModel = require("../models/product.model");

module.exports.addProduct = async (req, res) => {

    try {
        const { productName, sku, category, subcategory, description, unitPrice, minimumOrderQuantity, bulkPricing, color, material, dimensions, status, mainImage, additionalImages } = req.body;

        if (unitPrice < 1 || minimumOrderQuantity < 1) {
            return res.status(400).json({ success: false, message: "Price, stock & MOQ should be greater than 0" });
        }

        if (!productName || !category || !unitPrice || !sku) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const isProductExist = await productModel.findOne({ sku });

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
            sku,
            category,
            subcategory,
            description,
            unitPrice,
            minimumOrderQuantity,
            bulkPricing,
            color,
            material,
            dimensions,
            status,
            mainImage: mainImageUrl,
            additionalImages: additionalImageUrls
        })

        return res.status(200).json({ success: false, message: "Product created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};