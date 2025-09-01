const userModel = require("../models/user.model");

module.exports.createUser = async ({ fullName, email, contactNo, password, companyName, gstNo }) => {
    if(!fullName || !email || !contactNo || !password) {
        throw new Error("All fields are required");
    }

    const user = await userModel.create({
        fullName,
        email,
        contactNo,
        password,
        companyName,
        gstNo
    });

    return user;
};