const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/admin.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/api/products", authUser, getProducts);

module.exports = router;