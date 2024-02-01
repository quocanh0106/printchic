const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
  validateBoolean, } = require('./validatorCommon');

const deleteTemplateCVValidator = [
  validateObjectId('attachmentObjId', true),
]
module.exports = {
  deleteTemplateCVValidator,
};
