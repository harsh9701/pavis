const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { addProduct, deleteProduct, updateProduct, updateProductStatus, getProducts } = require("../controllers/product.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/", authUser, getProducts);

router.post("/new", authUser, upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 }
]), addProduct);

router.delete("/delete/:id", authUser, deleteProduct);

router.put("/update/:id", authUser, updateProduct);

router.patch("/updateStatus/:id", authUser, updateProductStatus);

module.exports = router;