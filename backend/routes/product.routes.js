const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { addProduct } = require("../controllers/product.controller");

router.post("/new", upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 }
]), addProduct);

module.exports = router;