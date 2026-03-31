const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

module.exports = (req, res, next) => {
   
    let token = null;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else {
        token = req.header('Authorization'); 
    }

   
    if (!token) {
        return res.redirect('/login');
    }

    try {
       
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data; 
        next(); 
    } catch (error) {

        return res.redirect('/login');
    }
};