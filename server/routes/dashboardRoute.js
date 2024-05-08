// // routes/dashboardRoute.js

// const express = require('express');
// const router = express.Router();
// const Dashboardmodel = require('../models/Dashboardmodel');

// // Route to get daily data
// router.get('/daily', async (req, res) => {
//   try {
//     // ดึงข้อมูล createdAt จาก MongoDB Atlas
//     const data = await Dashboardmodel.find({}, 'createdAt');
    
//     // นับจำนวนข้อมูลที่ถูกสร้างขึ้นในแต่ละวัน
//     const countsByDay = {};
//     data.forEach(item => {
//       const date = new Date(item.createdAt).toLocaleDateString();
//       countsByDay[date] = (countsByDay[date] || 0) + 1;
//     });
//     console.log(countsByDay);
//     res.json(countsByDay);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// module.exports = router;

// dashboardRoute.js

const express = require('express');
const router = express.Router();
const Dashboardmodel = require('../models/Dashboardmodel'); // Import your Mongoose model

// API route to fetch createdAt data and count entries per day
router.get('/Day', async (req, res) => {
  try {
    // Fetch createdAt data from MongoDB Atlas using Dashboardmodel
    const data = await Dashboardmodel.find({}, 'createdAt');
    
    // Count entries per day
    const countsByDay = {};
    data.forEach(item => {
      const date = new Date(item.createdAt).toLocaleDateString();
      countsByDay[date] = (countsByDay[date] || 0) + 1;
    });
    console.log(countsByDay);
    res.json(countsByDay);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  
});

// API route to fetch createdAt data and count entries per month
router.get('/Month', async (req, res) => {
  try {
    // Fetch createdAt data from MongoDB Atlas using Dashboardmodel
    const data = await Dashboardmodel.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ]);

    const countsByMonth = {};
    data.forEach(item => {
      countsByMonth[item._id] = item.count;
    });
    console.log(countsByMonth);
    res.json(countsByMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }

});

// API route to fetch createdAt data and count entries per year
router.get('/Year', async (req, res) => {
  try {
    // Fetch createdAt data from MongoDB Atlas using Dashboardmodel
    const data = await Dashboardmodel.aggregate([
      {
        $group: {
          _id: { $year: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ]);

    const countsByYear = {};
    data.forEach(item => {
      countsByYear[item._id] = item.count;
    });
    console.log(countsByYear);
    res.json(countsByYear);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
