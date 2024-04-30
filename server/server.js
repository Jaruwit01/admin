const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// const Mongoose = require("mongoose")
// const connect = Mongoose.connect('mongodb+srv://admin:Admin@emer-project.ahhfnfg.mongodb.net/emerproject?retryWrites=true&w=majority&appName=EMER-Project');


// mongoose.connect('mongodb+srv://admin:Admin@emer-project.ahhfnfg.mongodb.net/emerproject?retryWrites=true&w=majority&appName=EMER-Project');
mongoose.connect('mongodb://localhost:27017/users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const loginRouter = require('./routes/loginRoute');
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/logins', loginRouter);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

