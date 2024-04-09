const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const Mongoose = require("mongoose")
const connect = Mongoose.connect('mongodb+srv://admin:Admin@emer-project.ahhfnfg.mongodb.net/emerproject?retryWrites=true&w=majority&appName=EMER-Project');
console.log("Database is connected successfully!");
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// Routes
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
