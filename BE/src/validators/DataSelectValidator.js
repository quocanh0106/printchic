const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const listCitiesValidator = [
    check('countryObjId').notEmpty().withMessage('countryObjId must be required'),
];
module.exports = {
    listCitiesValidator,
};
