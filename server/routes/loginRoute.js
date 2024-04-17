const express = require('express');
const Admin = require('../models/Loginmodel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If user exists, send success response
    return res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.json({ data: admins });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
// );

module.exports = router;
