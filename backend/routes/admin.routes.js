const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const { getCustomers, addCategory, deleteCategory, getCategories, addSubCategory, deleteSubcategory, getOrders, updateOrderStatus, getOrderItems } = require("../controllers/admin.controller");
const { authUser, adminAuth } = require("../middlewares/auth.middleware");

router.get("/customers", authUser, adminAuth, getCustomers);
router.get("/categories", getCategories);
router.get("/orders", authUser, adminAuth, getOrders);
router.get("/orders/orderItems/:orderId", authUser, adminAuth, getOrderItems);
router.post("/orders/updateStatus/:orderId", authUser, adminAuth, updateOrderStatus);
router.post("/addCategory", authUser, adminAuth, upload.single("image"), addCategory);
router.post("/addSubcategory", authUser, adminAuth, addSubCategory);
router.post("/deleteSubcategory", authUser, adminAuth, deleteSubcategory);
router.delete("/category/:categoryId", authUser, adminAuth, deleteCategory);

module.exports = router;