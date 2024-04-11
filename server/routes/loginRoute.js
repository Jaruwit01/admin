const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Loginmodel');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const admin = await Admin.create(req.body);
//     res.json("success");
//   } catch (error) {
//     console.log(error, "createInformation");
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json({ data: admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
);

module.exports = router;
