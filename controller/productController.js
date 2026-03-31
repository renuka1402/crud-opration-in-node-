const Product = require('../models/Product');
const { formatError, validatePagination, validateProductData } = require('../utils/validation');

exports.showHome = async (req, res) => {
    try {
        const { value } = validatePagination(req.query, 5);
        const { page, limit, search } = value;

        let filter = { isDeleted: false };
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('index', {
            products,
           totalPages, 
            limit,
            currentPage: page,
            search,
            user: req.user
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).send('Error loading products');
    }
};

exports.showCreateProduct = (req, res) => res.render('create', { error: null, user: req.user });

exports.createProductPage = async (req, res) => {
    const { error, value } = validateProductData(req.body);
    if (error) return res.render('create', { error: formatError(error), user: req.user });

    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        await Product.create({ ...value, imageUrl });
        res.redirect('/');
    } catch (err) {
        res.render('create', { error: 'Registration failed', user: req.user });
    }
};

exports.showEditProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) return res.redirect('/');
    res.render('edit', { product, error: null, user: req.user });
};

exports.updateProductPage = async (req, res) => {
    const { error, value } = validateProductData(req.body);
    if (error) {
        const product = await Product.findById(req.params.id);
        return res.render('edit', { product, error: formatError(error), user: req.user });
    }

    try {
        if (req.file) value.imageUrl = `/uploads/${req.file.filename}`;
        await Product.findByIdAndUpdate(req.params.id, value);
        res.redirect('/');
    } catch (err) { 
        res.redirect('/'); 
    }
};

exports.deleteProductPage = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, { 
            isDeleted: true, 
            deletedAt: new Date() 
        });
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
};

