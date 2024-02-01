const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    check('content').notEmpty().withMessage('content must be required')
]
const updateValidator = [
    ...createValidator,
    validateObjectId('newObjId', true),
]
const validateNewObjIdValidator = validateObjectId('newObjId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateNewObjIdValidator,
};
