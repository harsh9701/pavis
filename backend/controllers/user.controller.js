const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { createUser } = require("../services/user.service");

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