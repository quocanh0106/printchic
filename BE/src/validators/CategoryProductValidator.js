const { check } = require('express-validator');

const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('titleUK').notEmpty().withMessage('Title UK must be required'),
    check('titleUS').notEmpty().withMessage('Title US must be required'),
    check('titleDE').notEmpty().withMessage('Title DE must be required'),
    check('titleFR').notEmpty().withMessage('Title FR must be required'),
    check('descriptionUK').notEmpty().withMessage('description UK must be required'),
    check('descriptionUS').notEmpty().withMessage('description US must be required'),
    check('descriptionDE').notEmpty().withMessage('description DE must be required'),
    check('descriptionFR').notEmpty().withMessage('description FR must be required'),
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
