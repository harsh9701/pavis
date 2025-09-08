const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, company, contactNo, email, password, confirmPassword, gstNo } = req.body;

        const userByEmail = await userModel.findOne({ email });
        const userByContactNo = await userModel.findOne({ contactNo });

        if (userByEmail) {
            return res
                .status(404)
                .json({ message: "User with this email is already registered" });
        }

        if (userByContactNo) {
            return res
                .status(404)
                .json({ message: "User with this contact number is already registered" });
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await createUser({
            fullName,
            email,
            contactNo,
            password: hashPassword,
            companyName: company,
            gstNo
        });

        const userData = {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            contactNo: user.contactNo,
            companyName: user.companyName
        }

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // set true in production (HTTPS required)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hour
        });

        return res.status(200).json({ token, userData });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email and password" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email and password" });
        }

        const userData = {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            contactNo: user.contactNo,
            companyName: user.companyName
        }

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // set true in production (HTTPS required)
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hour
        });

        res.status(200).json({ token, userData });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.getUserProfile = async (req, res) => {
    return res.status(201).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");

    const blacklistToken = await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logout user" });
};