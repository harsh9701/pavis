const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true
        },
        subcategories: [
            {
                type: String,
                trim: true,
            },
        ],
        status: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
