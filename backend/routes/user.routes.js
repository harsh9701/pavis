const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { registerUser, loginUser, getUserProfile, logoutUser, cartData, createOrder, getOrderDetail } = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.post("/register", [
    body("fullName").isLength({ min: 3 }).withMessage("Full name must be atleast 3 character"),
    body("contactNo").isLength({ min: 10 }).withMessage("Invalid Contact Number"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 character long")
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 6 character long")
], loginUser);

router.post("/createOrder", authUser, createOrder);

router.get("/orderDetail", authUser, getOrderDetail);
router.get("/cartData", authUser, cartData);
router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);

module.exports = router;