const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// module.exports.authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const isBlacklisted = await blacklistTokenModel.findOne({ token });

//     if (isBlacklisted) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         const userData = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             role: user.role,
//             contactNo: user.contactNo,
//             companyName: user.companyName
//         }

//         req.user = userData;

//         return next();

//     } catch (err) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// };

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized - No token provided" });
        }

        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ status: false, message: "Unauthorized - Token blacklisted" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized - User not found" });
        }

        req.user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            contactNo: user.contactNo,
            companyName: user.companyName,
        };

        next();

    } catch (err) {
        console.error("Auth error:", err.message);
        return res.status(401).json({ status: false, message: "Unauthorized - Invalid or expired token" });
    }
};

module.exports.adminAuth = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }

        next();
    } catch (err) {
        console.error("Admin auth error:", err);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};