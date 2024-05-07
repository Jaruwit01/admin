//server.js
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:Admin@emer-project.ahhfnfg.mongodb.net/emerproject?retryWrites=true&w=majority&appName=EMER-Project');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const loginRouter = require('./routes/loginRoute');
const dashboardRouter = require('./routes/dashboardRoute'); // เพิ่มเส้นทาง API ของ dashboardRoute.js

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/logins', loginRouter);
app.use('/dashboard', dashboardRouter); // เพิ่มการใช้งานเส้นทาง API ของ dashboardRoute.js

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
