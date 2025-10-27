const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model");
const orderModel = require("../models/order.model");
const { uploadBase64ToFirebase, deleteFromFirebase } = require("../utils/helper");
const productModel = require("../models/product.model");

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

        const productExists = await productModel.findOne({ category: categoryId });
        if (productExists) {
            return res.status(400).json({ status: false, message: "Products exist in this category" });
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

        const subcategoryName = category.subcategories[subIndex];
        if (!subcategoryName) {
            return res.status(400).json({ status: false, message: "Invalid subcategory index" });
        }

        const productExists = await productModel.findOne({ category: categoryId });
        if (productExists) {
            return res.status(400).json({ status: false, message: "Products exist in this subcategory" });
        }

        category.subcategories.splice(subIndex, 1);
        await category.save();

        return res.status(200).json({ status: true, message: "Subcategory deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

module.exports.getOrders = async (req, res) => {
    try {
        const ordersData = await orderModel.find({})
            .select("orderNumber createdAt grandTotal status orderItems")
            .populate({
                path: "userId",
                select: "fullName email contactNo _id"
            })
            .lean();

        const orders = ordersData.map(order => ({
            orderId: order._id,
            orderNumber: order.orderNumber,
            createdAt: order.createdAt,
            grandTotal: order.grandTotal,
            status: order.status,
            fullName: order.userId.fullName,
            email: order.userId.email,
            contactNo: order.userId.contactNo,
            userId: order.userId._id,
            orderItemsCount: order.orderItems.length
        }));

        return res.status(200).json({ status: true, orders });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.updateOrderStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const orderId = req.params.orderId;

        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });

        if (!order) {
            return res.status(404).json({ status: false, message: "Order not found" });
        }
        return res.status(200).json({ status: true, message: "Order status udpated" });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports.getOrderItems = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const orderItems = await orderModel.findById(orderId).select("orderItems");

        if (!orderItems || orderItems.orderItems.length === 0) {
            return res.status(404).json({ status: false, message: "OrderItems not found" });
        }
        return res.status(200).json({ status: true, items: orderItems.orderItems });
    } catch (err) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};
