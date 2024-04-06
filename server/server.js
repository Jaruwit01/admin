const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
