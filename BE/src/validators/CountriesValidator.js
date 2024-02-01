const { check } = require('express-validator');

const { validateObjectId,
} = require('./validatorCommon');

const createValidator = [
    check('countryName').notEmpty().withMessage('countryName must be required'),
    // check('cities')
    //     .isArray()
    //     .notEmpty()
    //     .withMessage('cities must be required')
]
const updateValidator = [
    ...createValidator,
    validateObjectId('countryObjId', true),
]
const validateCountryObjIdValidator = validateObjectId('countryObjId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCountryObjIdValidator,
};
