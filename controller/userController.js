const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

/**
 * @desc   updat User
 * @route   /api/users/:id
 * @method  put
 * @access  private
 */
const updateUser = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Hashing password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updateUser);
  })

  /**
 * @desc   Get all Users
 * @route   /api/users
 * @method  Get
 * @access  private (only admin)
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })

  /**
 * @desc   Get User by ID
 * @route   /api/users/:id
 * @method  Get
 * @access  private (only admin & user himself)
 */
const getUserById =  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })

  /**
 * @desc   Delete User by ID
 * @route   /api/users/:id
 * @method  DElETE
 * @access  private (only admin & user himself)
 */
const deleteUserById =  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({message: "User has been deleted successfully"});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })

  module.exports = { updateUser, getAllUsers, getUserById, deleteUserById}