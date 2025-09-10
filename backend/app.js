const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");

const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");

connectToDB();

app.use(cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
}));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({limit: "10mb"}));
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/product", productRoute);

module.exports = app;

// app.listen(3000, ()=> {
//     console.log("Server is running");
// });