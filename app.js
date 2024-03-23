const fs = require("fs");
const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

const userRoutes = require("./routes/user.js");
const loginSignupRoutes = require("./routes/login-signup.js");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const reportRoutes = require("./routes/report");

app.use(compression()); // for compressing css and js files mainly, image files are not compressed.
app.use(cors());
app.use(express.json());

app.use("/check", (req, res) => {
  res.json({ msg: "hello guys..!" });
});

app.use("/auth", loginSignupRoutes);
app.use("/user",userRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/report", reportRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

mongoose
  .connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/expense-tracker?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
