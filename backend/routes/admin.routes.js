const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const { getCustomers, addCategory, deleteCategory, getCategories, addSubCategory, deleteSubcategory, getOrders } = require("../controllers/admin.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/customers", authUser, getCustomers);
router.get("/categories", getCategories);
router.get("/orders", getOrders);
router.post("/addCategory", authUser, upload.single("image"), addCategory);
router.post("/addSubcategory", authUser, addSubCategory);
router.post("/deleteSubcategory", authUser, deleteSubcategory);
router.delete("/category/:categoryId", authUser, deleteCategory);

module.exports = router;