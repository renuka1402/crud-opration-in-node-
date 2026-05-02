// const express = require('express');
// const authController = require('../controller/authController');
// const { validateRegister, validateLogin } = require('../utils/validation');
// const router = express.Router();
// router.get('/register', authController.showRegister);
// router.post('/register', validateRegister, authController.registerUser);
// router.get('/login', authController.showLogin);
// router.post('/login', validateLogin, authController.loginUser);
// router.get('/logout', authController.logoutUser);

// module.exports = router;

const express = require('express');
const authController=require('../controller/authController')
const router=express.Router();
const {validateRegister,validateLogin}=require('../utils/validation');


router.get('/register',authController.showRegister)
router.post('/register', validateRegister,authController.registerUser)
router.get('/login',authController.showLogin)
router.post('/login', validateLogin,authController.loginUser)
router.get('/logout',authController.logoutUser)
module.exports=router;
