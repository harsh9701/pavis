const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
    },
    gstNo: {
        type: String,
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;