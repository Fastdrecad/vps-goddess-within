// Bring in Models & Helpers
const User = require('../models/user');

const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');

/* @desc Register user */
/* route POST /api/users */
/* access Public */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/* @desc Auth user & get token */
/* route POST /api/users/login */
/* access Public */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      wishList: user.wishlist
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials.');
  }
});

/* @desc Logout user / clear cookie */
/* route POST /api/users/logout */
/* access Private */
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = { registerUser, loginUser, logoutUser };
