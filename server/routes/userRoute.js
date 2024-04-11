const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler'); // Import express-async-handler
const User = require('../models/Usermodel');

// GET all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
}));

module.exports = router;
