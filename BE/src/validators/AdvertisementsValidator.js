const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
  validateBoolean, } = require('./validatorCommon');
const { POSITION_ADVERTISEMENTS } = require('../utils/constants');
const POSITION_ADVERTISEMENTS_ENUM = Object.values(POSITION_ADVERTISEMENTS);
const createValidator = [
  validateEnum('position', POSITION_ADVERTISEMENTS_ENUM, true),
  validateObjectId('configObjId', true),
  validateNumber('revenue', true),
  check('advertisementName').notEmpty().withMessage('advertisementName must be required!'),
  check('url').notEmpty().withMessage('url must be required!'),
  validateDateByFormat('startDate', 'YYYY-MM-DD', true),
  validateDateByFormat('endDate', 'YYYY-MM-DD', true),
]
const advertisementObjId = validateObjectId('advertisementObjId', true);
const updateValidator = [
  advertisementObjId,
  check('advertisementName').notEmpty().withMessage('advertisementName must be required!'),
  check('url').notEmpty().withMessage('url must be required!'),
]
module.exports = {
  createValidator,
  advertisementObjId,
  updateValidator,
};
