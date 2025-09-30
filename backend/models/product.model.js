const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        sku: {
            type: String,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subcategory: {
            type: String,
        },
        description: {
            type: String,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        minimumOrderQuantity: {
            type: Number,
            default: 1,
        },
        taxRate: {
            type: Number,
            required: true
        },
        taxType: {
            type: String,
            required: true
        },
        bulkPricing: [
            {
                quantity: { type: Number },
                price: { type: Number },
            },
        ],
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"]
        },
        discount: {
            type: Number, // in percentage
            default: 0,
        },
        mainImage: {
            type: String,
            required: true
        },
        additionalImages: [
            { type: String }
        ],
    },
    { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;