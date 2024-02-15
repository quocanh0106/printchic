const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('handleUrl').notEmpty().withMessage('handleUrl must be required'),
    check('description').notEmpty().withMessage('description must be required'),
    check('sku').notEmpty().withMessage('sku must be required'),
    check('price').notEmpty().withMessage('price must be required'),
    check('options').notEmpty().withMessage('options must be required'),
    check('buttonLink').notEmpty().withMessage('buttonLink must be required'),
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
