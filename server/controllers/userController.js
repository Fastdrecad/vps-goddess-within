const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Bring in Models & Helpers
const User = require("../models/user");
const keys = require("../config/keys");
const asyncHandler = require("../middleware/asyncHandler");

/* @desc Get user profile */
/* route GET /api/users/profile */
/* access Private */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(404);
    throw new Error("User not founds");
  }
});

/* @desc Update user profile */
/* route PUT /api/users/profile */
/* access Private */
const updateUsersProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* @desc Get users */
/* route GET /api/users */
/* access Private/Admin */
const getUsers = asyncHandler(async (req, res) => {
  const {
    page = Number(req.query.pageNumber) || 1,
    limit = Number(req.query.limit) || 2
  } = req.query;

  const skip = (page - 1) * limit;

  const totalDocuments = await User.countDocuments();

  const users = await User.find({}).skip(skip).limit(limit);

  const totalPages = Math.ceil(totalDocuments / limit);

  res.status(200).json({
    totalPages,
    currentPage: parseInt(page),
    totalUsers: totalDocuments,
    count: users.length,
    users
  });
});

/* @desc Get users by Id */
/* route GET /api/users/:id */
/* access Private/Admin */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* @desc Delete users */
/* route DELETE /api/users/:id */
/* access Private/Admin */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role === "ROLE ADMIN") {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/* @desc Update user */
/* route PUT /api/users/:id */
/* access Private/Admin */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.firstName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getUserProfile,
  updateUsersProfile,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
};
