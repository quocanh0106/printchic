const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('handleUrlUK').notEmpty().withMessage('handleUrl UK must be required'),
    check('handleUrlUS').notEmpty().withMessage('handleUrl US must be required'),
    check('handleUrlFR').notEmpty().withMessage('handleUrl FR must be required'),
    check('handleUrlDE').notEmpty().withMessage('handleUrl DE must be required'),

    check('descriptionUK').notEmpty().withMessage('description UK must be required'),
    check('descriptionUS').notEmpty().withMessage('description US must be required'),
    check('descriptionFR').notEmpty().withMessage('description FR must be required'),
    check('descriptionDE').notEmpty().withMessage('description DE must be required'),

    check('typeUK').notEmpty().withMessage('type UK must be required'),
    check('typeUS').notEmpty().withMessage('type US must be required'),
    check('typeFR').notEmpty().withMessage('type FR must be required'),
    check('typeDE').notEmpty().withMessage('type DE must be required'),

    check('variants').notEmpty().withMessage('variants must be required')
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
