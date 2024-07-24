const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
/**
 * @desc    Get Forgot Password View
 * @route   /password/forgot-password
 * @method  GET
 * @access  puplic
 */
module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @desc    Send Forgot Password View
 * @route   /password/forgot-password
 * @method  POST
 * @access  puplic
 */
module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: " user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:8000/password/reset-password/${user.id}/${token}`;

  res.json({ message: "Click on the link", resetPasswordLink: link });
});

/**
 * @desc  Get Reset Password View
 * @route   /password/forgot-password/:userid/:token
 * @method  Get
 * @access  puplic
 */
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: " user not found again" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});

/**
 * @desc    Reset Password The Password
 * @route   /password/forgot-password/:userid/:token
 * @method  POST
 * @access  puplic
 */
module.exports.resetThePassword = asyncHandler(async (req, res) => {
  // TODO : Vlidation

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: " user not found third" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;

    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
});
