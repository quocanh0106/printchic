const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    check('content').notEmpty().withMessage('content must be required'),
    validateObjectId('categoryBlogId', true),
    check('status').notEmpty().withMessage('status must be required'),
]
const updateValidator = [
    ...createValidator,
    validateObjectId('blogId', true),
]
const validateCatBlogIdValidator = validateObjectId('blogId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatBlogIdValidator,
};
