import mongoose from "mongoose";

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
            type: String,
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
        bulkPricing: [
            {
                minQuantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        discount: {
            type: Number, // in percentage
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        minOrderQuantity: {
            type: Number,
            default: 1,
        },
        mainImage: {
            url: { type: String, required: true }, // the primary image
            alt: { type: String },
        },
        images: [
            {
                url: String,
                alt: String,
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        tags: [String],
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);