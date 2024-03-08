const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('titleUK').notEmpty().withMessage('titleUK must be required'),
    check('titleUS').notEmpty().withMessage('titleUS must be required'),
    check('titleDE').notEmpty().withMessage('titleDE must be required'),
    check('titleFR').notEmpty().withMessage('titleFR must be required'),
]
const updateValidator = [
    ...createValidator,
    validateObjectId('tagId', true),
]

const validateCatBlogIdValidator = validateObjectId('tagId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatBlogIdValidator,
};
