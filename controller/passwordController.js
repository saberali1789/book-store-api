const asyncHandler = require("express-async-handler");
const { User, validateChangePassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
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
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: " user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "30m",
  });

  const link = `http://localhost:8000/password/reset-password/${user._id}/${token}`;

 

  // Send email to the user
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });


const mailOption = {
  form: process.env.USER_EMAIL,
  to: user.email,
  subject: "Reset Password",
  html: `<div>
              <h4>Click on the link below to reset your password</h4>
              <p>${link}</p>
        </div>`,
};
transporter.sendMail(mailOption, function (error, success) {
  if (error) {
    console.log(error);
    response.status(500).json({message: 'something went wrong'})
  } else {
    console.log("Email sent:" + success.response);
    res.render('link-sender')
  }
});


});

/**
 * @desc    Get Reset Password View
 * @route   /password/reset-password/:userId/:token
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
 * @route   /password/forgot-password/:userId/:token
 * @method  POST
 * @access  puplic
 */
module.exports.resetThePassword = asyncHandler(async (req, res) => {
const {error} = validateChangePassword(req.body)
if(error) {
  return res.status(400).json({message: error.details[0].message});
}

  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }

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
    res.json({ message: "Error here" });
  }
});
