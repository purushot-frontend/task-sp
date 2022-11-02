require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const catchAsync = require("./../utils/catchAsync");

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = { ...req.body };

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 400;
    throw error;
  }

  //comparing database hashed password with user input password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error("Invalid Password");
    error.statusCode = 400;
    throw error;
  }

  // creating temporary jwt token
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

//TASK 2 : Write a NodeJS API with middleware to validate JWT token and return status code 402 if not found or not valid.
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    const error = new Error(
      "You are not logged in! Please log in to get access."
    );
    error.statusCode = 400;
    throw error;
  }

  // 2) Verification token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    throw new Error("The user belonging to this token does no longer exist.");
  }

  // 4) setting user id
  req.userId = decodedToken.id;
  next();
});
