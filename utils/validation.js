const Joi = require('joi');

const schemas = {
    register: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    product: Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().integer().min(0).required(),
        mfgDate: Joi.date().required()
    })
};

exports.formatError = (error) => {
    if (!error) return null;
    return error.details.map(err => err.message).join(', ');
};

exports.validatePagination = (query, defaultLimit = 5) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || defaultLimit;
    const search = query.search || "";
    return {
        value: {
            page: page < 1 ? 1 : page,
            limit: limit,
            search: search
        }
    };
};

exports.validateRegisterData = (data) => schemas.register.validate(data, { abortEarly: false });
exports.validateLoginData = (data) => schemas.login.validate(data, { abortEarly: false });
exports.validateProductData = (data) => {
    const payload = {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        mfgDate: data.mfgDate || data.manufacturedDate
    };
    return schemas.product.validate(payload, { abortEarly: false });
};