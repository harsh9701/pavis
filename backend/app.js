const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");

const userRoute = require("./routes/user.routes");

connectToDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoute);

module.exports = app;

// app.listen(3000, ()=> {
//     console.log("Server is running");
// });