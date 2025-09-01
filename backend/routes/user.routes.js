const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");

router.post("/register", [
    body("fullName").isLength({ min: 3 }).withMessage("Full name must be atleast 3 character"),
    body("contactNo").isLength({ min: 10 }).withMessage("Invalid Contact Number"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long")
], registerUser);

module.exports = router;