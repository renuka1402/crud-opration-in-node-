// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET ;
// module.exports = (req, res, next) => {
//     let token = null;
//     if (req.cookies && req.cookies.token) {
//         token = req.cookies.token;
//     } 
//     if (!token) {
//         return res.redirect('/login');
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data; 
//         next(); 
//     } catch (error) {
//         return res.redirect('/login');
//     }
// };

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User')

module.exports =async (req, res, next) => {
    let token = null;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token
    }
    if (!token) {
        return res.redirect('/login')
    }

    try {
        const verify = jwt.verify(token, JWT_SECRET)
        console.log(212121, verify);
        const user =await User.findById( verify.id)
        req.user = user;
        console.log(3233, user);
        next()

    } catch (error) {
        return res.redirect('/login')
    }
}

