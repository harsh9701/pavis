const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model");
const { uploadBase64ToFirebase, deleteFromFirebase } = require("../utils/helper");

module.exports.getCustomers = async (req, res) => {
    try {
        const customers = await userModel.find({});

        return res.status(200).json({ status: true, customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.addCategory = async (req, res) => {
    try {
        const { category, image } = req.body;
        let imageUrl = "";

        const isCategoryExist = await categoryModel.findOne({
            name: { $regex: `^${category}$`, $options: "i" } // i = ignore case
        });

        if (isCategoryExist) {
            return res.status(400).json({ status: false, message: `${category} is already exist` });
        }

        if (!category) {
            return res.status(400).json({ status: false, message: "Category is required" });
        }

        if (!image) {
            return res.status(400).json({ status: false, message: "Category image is required" });
        }

        // Handle main image
        if (image) {
            imageUrl = await uploadBase64ToFirebase(image.url, image.name);
        }

        const newCategory = await categoryModel.create({
            name: category,
            imageUrl
        })

        return res.status(200).json({ status: true, message: "Category added successfully", category: newCategory });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        return res.status(200).json({ status: true, categories });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.addSubCategory = async (req, res) => {
    const { categoryId, newSubcategory } = req.body;

    try {

        const isCategoryExist = await categoryModel.findById(categoryId);

        if (!isCategoryExist) {
            return res.status(400).json({ status: false, message: "Category Not Found" });
        }

        isCategoryExist.subcategories.push(newSubcategory);

        const category = await categoryModel.findByIdAndUpdate(
            categoryId,
            { $push: { subcategories: newSubcategory } },
            { new: true }
        );

        return res.status(200).json({ status: true, updatedSubcategories: category.subcategories });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        if (!categoryId) {
            return res.status(400).json({ status: false, message: "Product id is required" });
        }

        const isCategoryExist = await categoryModel.findById(categoryId);

        if (!isCategoryExist) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        if (isCategoryExist.imageUrl) {
            await deleteFromFirebase(isCategoryExist.imageUrl);
        }

        const category = await categoryModel.findByIdAndDelete(categoryId, { new: true });

        return res.status(200).json({ status: true, message: "Category deleted successfully", category });
    } catch (error) {
        return res.status(500).json({ status: false, message: true });
    }
};

module.exports.deleteSubcategory = async (req, res) => {
    try {
        const { categoryId, subIndex } = req.body;

        const category = await categoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        category.subcategories.splice(subIndex, 1);
        await category.save();

        return res.status(200).json({ status: true, message: "SubCategory Deleted" });

    } catch (error) {
        return res.status(500).json({ status: false, message: true });
    }
}