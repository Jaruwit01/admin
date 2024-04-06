const express = require('express');
const router = express.Router();
const Post = require('../models/Postmodel');

// POST a new Post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json("success");
  } catch (error) {
    console.log(error, "createInformation");
    res.status(500).send("Internal Server Error");
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) res.status(404).send("No post found");
    res.json("success");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
