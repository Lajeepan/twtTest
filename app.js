const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;
