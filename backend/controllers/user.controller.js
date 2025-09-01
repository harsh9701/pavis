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

        const hashPassword = await userModel.hashPassword(password);

        const user = await createUser({
            fullName,
            email,
            contactNo,
            password: hashPassword,
            companyName: company,
            gstNo
        });

        const token = user.generateAuthToken();

        return res.status(200).json({ token, user });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.loginUser = async (req, res) => {
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

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res) => {
    return res.status(201).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");

    const blacklistToken = await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logout user" });
}