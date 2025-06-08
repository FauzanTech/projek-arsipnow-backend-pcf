const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRoute');
const smRouter = require('./routes/smRoute');
const userRouter = require('./routes/userRoute');
const skRouter = require('./routes/skRoute');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/masuk', smRouter);
app.use('/api/user', userRouter);
app.use('/api/keluar', skRouter);

module.exports = app;