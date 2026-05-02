const express = require('express');
const router = express.Router();
const uiAuth = require('../middleware/uiAuth');
const productController = require('../controller/productController');
const { validateProduct } = require('../utils/validation');
const upload = require("../middleware/multer");

router.get('/', uiAuth, productController.showHome);
router.post('/product/create', uiAuth, validateProduct, productController.createProductPage);
router.get('/product/edit/:id', uiAuth, productController.showEditProduct);
router.post('/product/edit/:id', uiAuth, validateProduct, productController.updateProductPage);
router.get('/product/delete/:id', uiAuth, productController.deleteProductPage);

module.exports = router;