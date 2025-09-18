const express = require("express");
const router = express.Router();

const { getCustomers } = require("../controllers/admin.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/customers", authUser, getCustomers);

module.exports = router;