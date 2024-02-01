const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const updateValidator = [
  validateObjectId('configObjId', true),
  validateNumber('value', true),
]
module.exports = {
  updateValidator,
};
