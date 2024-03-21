const { check } = require('express-validator');

const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('handleUrlUS').notEmpty().withMessage('handleUrl US must be required'),
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
