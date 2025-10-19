const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                productName: {
                    type: String,
                    required: true
                },
                unitPrice: {
                    type: Number,
                    required: true
                },
                minimumOrderQuantity: {
                    type: Number,
                    required: true
                },
                mainImage: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        lastNotified: { type: Date, default: null }
    },
    { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);