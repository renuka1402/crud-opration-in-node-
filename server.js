require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash'); // Recommended over 'flash'
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./route/authRoutes');
const productRoutes = require('./route/productRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session must come before Flash
app.use(session({ 
    secret: 'secret_key', 
    resave: false, 
    saveUninitialized: true 
}));

app.use(flash());

// Global variables for Flash Messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/', productRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB Connected');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on http://localhost:3000`);
        });
    })
    .catch((err) => {
        console.log('DB Error:', err);
    });