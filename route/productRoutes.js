const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uiAuth = require('../middleware/uiAuth');
const productController = require('../controller/productController');

// Multer Setup
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


router.get('/', uiAuth, productController.showHome);

router.get('/product/create', uiAuth, productController.showCreateProduct);
router.post('/product/create', uiAuth, upload.single('image'), productController.createProductPage);

router.get('/product/edit/:id', uiAuth, productController.showEditProduct);
router.post('/product/edit/:id', uiAuth, upload.single('image'), productController.updateProductPage);

router.get('/product/delete/:id', uiAuth, productController.deleteProductPage);



module.exports = router;