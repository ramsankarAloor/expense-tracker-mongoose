const fs = require("fs");
const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

const Users = require("./models/user.js");
const Expenses = require("./models/expenses");
const Orders = require("./models/orders");
const Forgotpassword = require("./models/forgotpassword");
const Downloads = require("./models/downloads");

const userRoutes = require("./routes/user.js");
const loginSignupRoutes = require("./routes/login-signup.js");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const resetPasswordRoutes = require("./routes/reset-password.js");
const reportRoutes = require("./routes/report");

app.use(compression()); // for compressing css and js files mainly, image files are not compressed.
app.use(cors());
app.use(express.json());

app.use("/check", (req, res) => {
  console.log("hello");
  res.json({ msg: "hello guys..!" });
});

// app.use(userRoutes);
app.use(loginSignupRoutes);
// app.use("/purchase", purchaseRoutes);
// app.use("/premium", premiumRoutes);
// app.use("/password", resetPasswordRoutes);
// app.use("/report", reportRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Users.hasMany(Expenses);
// Users.hasMany(Orders);
// Users.hasMany(Forgotpassword);
// Users.hasMany(Downloads);

// sequelize
//   .sync()
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

mongoose
  .connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/expense-tracker?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
