const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../controller/passwordController");
const router = express.Router();

router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

// /password/reset-password/:userid/:token
router
  .route("/reset-password/:userid/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
