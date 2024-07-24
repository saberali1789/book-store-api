const express = require("express");
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken.js");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controller/userController.js");

router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAuthorization, getUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

router.get("/", verifyTokenAndAdmin, getAllUsers);

router;

module.exports = router;
