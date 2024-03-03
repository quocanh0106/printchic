const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('handleUrl').notEmpty().withMessage('handleUrl must be required'),
    check('descriptionUK').notEmpty().withMessage('description UK must be required'),
    check('descriptionUS').notEmpty().withMessage('description US must be required'),
    check('descriptionFR').notEmpty().withMessage('description FR must be required'),
    check('descriptionDE').notEmpty().withMessage('description DE must be required'),
    check('type').notEmpty().withMessage('type must be required'),
    check('variants').notEmpty().withMessage('variants must be required'),
    check('metaDescription').notEmpty().withMessage('metaDescription must be required')
]
const updateValidator = [
    ...createValidator,
    validateObjectId('productId', true),
]
const validateProIdValidator = validateObjectId('productId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateProIdValidator,
};
