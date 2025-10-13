const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { addProduct, deleteProduct, updateProduct, updateProductStatus, getProducts, newArrivals, addToCart } = require("../controllers/product.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/", getProducts);
router.get("/newArrivals", newArrivals);

router.post("/new", authUser, upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 }
]), addProduct);

router.post("/addToCart", authUser, addToCart);

router.delete("/delete/:id", authUser, deleteProduct);

router.put("/update/:id", authUser, updateProduct);

router.patch("/updateStatus/:id", authUser, updateProductStatus);

module.exports = router;