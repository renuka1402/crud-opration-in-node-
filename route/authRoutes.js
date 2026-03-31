const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/register', authController.showRegister);
router.post('/register', authController.registerUser);
router.get('/login', authController.showLogin);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);




module.exports = router;
