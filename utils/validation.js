const Joi = require('joi');

const schemas = {
    register: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    product: Joi.object({
        name: Joi.string().min(4).required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().integer().min(0).required(),
        mfgDate: Joi.date().required()
    })
};

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        req.flash('error', error.details[0].message);
        const backURL = req.header('Referer');
       return res.redirect(backURL); 
    }
    next();
};

module.exports = {
    validateRegister: validate(schemas.register),
    validateLogin: validate(schemas.login),
    validateProduct: validate(schemas.product)
};


// const Joi=require('joi')
// const schemas={
//     register:Joi.object({
//         name:Joi.string().min(2).max(20).required(),
//         email:Joi.string().email().required(),
//         password:Joi.string().min(8).required
//     }),
//     login:Joi.object({
//         email:Joi.string.email().required(),
//         password:Joi.string.required(),
//     }),
//     product :Joi.object({
//        name:Joi.string().min(2).required(),
//        price:Joi.number().integer().required(),
//          quantity: Joi.number().integer().min(0).required(),
//         mfgDate: Joi.date().required()
//     }),
// }
// const validate=(schema)=>(req,req,next)=>{
//     const {error}=schema.validate(req.body)
//     if(error){
        
//     }
// }