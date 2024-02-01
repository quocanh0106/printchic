const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
  validateBoolean, } = require('./validatorCommon');

const notificationObjIdValidator = validateObjectId('notificationObjId', true);

module.exports = {
  notificationObjIdValidator,
};
