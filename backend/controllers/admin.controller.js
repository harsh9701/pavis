const productModel = require("../models/product.model");

module.exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find({}, { bulkPricing: 0, color: 0, material: 0, dimensions: 0, discount: 0, additionalImages: 0 });
        return res.status(200).json({ status: true, products });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal Sever Error" });
    }
};