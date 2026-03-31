require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./route/authRoutes');
const productRoutes = require('./route/productRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is missing');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Database connection failed');
       
    });