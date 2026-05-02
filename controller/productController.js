// const Product = require('../models/Product');


// // exports.showHome = async (req, res) => {
// //     try {
// //         const page = Number(req.query.page) || 1;
// //         const limit = 10; 
// //         const search = req.query.search || "";

// //         let filter = { isDeleted: false };

// //         if (search) {
// //             filter.name = { $regex: search, $options: 'i' };
// //         }
// //         const products = await Product.find(filter)
// //             .skip((page - 1) * limit)
// //             .limit(limit);
// //         const total = await Product.countDocuments(filter);

// //         const totalPages = Math.ceil(total / limit);
// // console.log(33,req.user);

// //         res.render('index', {
// //             products,
// //             currentPage: page,
// //             totalPages,
// //             search,
// //             user: req.user,
// //             limit
// //         });

// //     } catch (err) {
// //         res.send('Error');
// //     }
// // };



// exports.showHome = async (req, res) => {
//     console.log(10);
//     try {
//         console.log(1);
//         let limit = 10
//         let search = req.query.search || ''
//         let page = req.query.page || 1


//         let whereOptions = {
//             isDeleted: false
//         }
//                 console.log("whereoptions1", whereOptions);


//         if(search){
//             // products.name={$regex:search,$option:i}
//             console.log("search", search)
//             whereOptions.name = {$regex:search,$option:i} //like op
//         }

//         console.log("whereoptions", whereOptions);

//         const products = await Product.find(whereOptions).skip((page - 1) * limit).limit(limit)
//         console.log('prodssss', products);
//         console.log(12);

//         const total = await Product.countDocuments(whereOptions)
//         console.log(total);

//         const totalPage = Math.ceil(total / limit)
//         res.render('index', {
//             products,
//             currentPage: page,
//             totalPages: totalPage,
//             search,
//             user: req.user,
//             limit
//         })
//     } catch (error) {
//         res.render(error)

//     }
// }

// // exports.showHome=async(req,res)=>{
// //     try {
// //         let page=req.query.page || 1
// //         let limit=5
// //         let search =req.query.search || ''

// //         const products =await Product.find({isDeleted:false}).skip((page-1)*limit).limit(limit)

// //         const total=await Product.countDocuments(products)
// //         const totalPage= Math.ceil(total/limit)
// //         if(search){
// //             products.name={$regex:search,$option:i}
// //         }
// //         res.render(index,
// //             {
// //                 products,
// //               currentPage:page,
// //             totalPages:totalPage,
// //             search,
// //             user:req.user,
// //             limit
// //             }
// //         )

// //     } catch (error) {

// //     }
// // }






// exports.createProductPage = async (req, res) => {

//     try {
//         await Product.create({
//             ...req.body
//         })
//         res.redirect('/')
//     } catch (error) {
//         res.render('error:'+error.message)
//     }
// };
// exports.showEditProduct = async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (!product || product.isDeleted) {
//         return res.redirect('/');
//     }

//     res.render('edit', { product, error: null, user: req.user });

// };
// exports.updateProductPage = async (req, res) => {
//     try {
//         const data = req.body;

//         await Product.findByIdAndUpdate(req.params.id, data);

//         res.redirect('/');
//     } catch (err) {
//         res.redirect('/');
//     }
// };
// exports.deleteProductPage = async (req, res) => {
//     try {
//         await Product.findByIdAndUpdate(req.params.id, {
//             isDeleted: true,
//             deletedAt: new Date()
//         });

//         res.redirect('/');
//     } catch (err) {
//         res.redirect('/');
//     }
// };

const Product = require('../models/Product');

exports.showHome = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const search = req.query.search || "";

        let filter = { isDeleted: false };

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(limit); const total = await Product.countDocuments(filter);

        const totalPages = Math.ceil(total / limit);
        console.log(33, req.user);

        res.render('index', {
            products,
            currentPage: page,
            totalPages,
            search,
            user: req.user,
            limit
        });

    } catch (err) {
        res.send('Error');
    }

exports.createProductPage = async (req, res) => {
    try {
        await Product.create({ ...req.body });
        req.flash('success', 'Product created successfully!');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'Error creating product: ' + error.message);
        res.redirect('/');
    }
};

exports.showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || product.isDeleted) {
            req.flash('error', 'Product not found');
            return res.redirect('/');
        }
        res.render('edit', { product });
    } catch (err) {
        res.redirect('/');
    }
};

exports.updateProductPage = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        req.flash('success', 'Product updated successfully!');
        res.redirect('/');
    } catch (err) {
        req.flash('error', 'Failed to update product');
        res.redirect('/');
    }
};

exports.deleteProductPage = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
            deletedAt: new Date()
        });
        req.flash('success', 'delete successfully');
        res.redirect('/');
    } catch (err) {
        req.flash('error', 'Error deleting product');
        res.redirect('/');
    }
};