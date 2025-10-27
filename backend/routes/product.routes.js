const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { addProduct, deleteProduct, updateProduct, updateProductStatus, getProducts, newArrivals, addToCart, removeFromCart, updateCartQuantity, getProductDetail, getProductsByCategory } = require("../controllers/product.controller");
const { authUser, adminAuth } = require("../middlewares/auth.middleware");

router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/view/:productId", getProductDetail);
router.get("/newArrivals", newArrivals);

router.post("/new", authUser, adminAuth, upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 }
]), addProduct);

router.post("/addToCart", authUser, addToCart);

router.post("/removeFromCart", authUser, removeFromCart);

router.post("/updateCartQuantity", authUser, updateCartQuantity);

router.delete("/delete/:id", authUser, adminAuth, deleteProduct);

router.put("/update/:id", authUser, adminAuth, updateProduct);

router.patch("/updateStatus/:id", authUser, adminAuth, updateProductStatus);

module.exports = router;