const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { formatError, validateLoginData, validateRegisterData } = require('../utils/validation');

const JWT_SECRET = process.env.JWT_SECRET;

exports.showRegister = (req, res) => res.render('register', { error: null });
exports.showLogin = (req, res) => res.render('login', { error: null });


exports.registerUser = async (req, res) => {
    const { error, value } = validateRegisterData(req.body);
    if (error) {
        return res.render('register', { error: formatError(error) });
    }

    try {
    
        const userExists = await User.findOne({ email: value.email });
        if (userExists) return res.render('register', { error: 'Email already exists' });

    
        const hashedPassword = await bcrypt.hash(value.password, 10);

      
        await User.create({ ...value, password: hashedPassword });

        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: 'Registration failed' });
    }
};


exports.loginUser = async (req, res) => {
   
    const { error, value } = validateLoginData(req.body);
    if (error) {
        return res.render('login', { error: formatError(error) });
    }

    try {
        const user = await User.findOne({ email: value.email });
        
    
        if (!user || !(await bcrypt.compare(value.password, user.password))) {
            return res.render('login', { error: 'Invalid Email or Password' });
        }


        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '8h' });

        res.cookie('token', token);
        res.redirect('/');
        
    } catch (err) {
        res.render('login', { error: 'Login Error' });
    }
};

// 3. Logout
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};