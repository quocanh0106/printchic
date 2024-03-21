const { check } = require('express-validator');
const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('titleUS').notEmpty().withMessage('titleUS must be required'),
]
const updateValidator = [
    ...createValidator,
    validateObjectId('tagId', true),
]

const validateCatTagIdValidator = validateObjectId('tagId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatTagIdValidator,
};
