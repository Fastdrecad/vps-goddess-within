const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { secret, tokenLife } = keys.jwt;

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: tokenLife
  });

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

module.exports = generateToken;
