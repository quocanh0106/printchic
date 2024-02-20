const { check } = require('express-validator');

const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    check('description').notEmpty().withMessage('description must be required')
]
const updateValidator = [
    ...createValidator,
    validateObjectId('categoryProductId', true),
]
const validateCatProIdValidator = validateObjectId('categoryProductId', true);

const validateValidator = [
    check('listCategoryProduct.*.title').notEmpty().withMessage('title must be required'),
    check('listCategoryProduct.*.description').notEmpty().withMessage('description must be required'),
    check('listCategoryProduct.*.bannerImg').notEmpty().withMessage('bannerImg must be required')
]

module.exports = {
    createValidator,
    updateValidator,
    validateCatProIdValidator,
    validateValidator
};
