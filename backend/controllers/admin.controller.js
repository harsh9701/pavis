const userModel = require("../models/user.model");

module.exports.getCustomers = async (req, res) => {
    try {
        const customers = await userModel.find({});

        return res.status(200).json({ status: true, customers });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};