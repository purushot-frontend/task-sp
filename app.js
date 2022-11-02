require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const employeeRoutes = require("./routes/employee");
const taskRoutes = require("./routes/task");
const cookieMiddlware = require("./utils/cookieMiddleware");
const app = express();

//common middlewares

//body & cookie parser
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//routes

app.use("/api/user", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/task", taskRoutes);

//catch errors
app.use((error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  if (error.message == "invalid token") {
    statusCode = 402;
  }

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

//invalid url
app.all("*", function (req, res) {
  res.status(404).json({
    status: "error",
    message: "Invalid URL.",
  });
});

module.exports = app;
