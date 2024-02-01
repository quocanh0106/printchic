const { check } = require('express-validator');

const {
    isValidDate,
} = require('../utils/shared');
const validateObjectId = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty()
            .withMessage(`${field} is required`)
            .isMongoId()
            .withMessage(`${field} must be an ObjectId`);
    }
    return check([field])
        .optional({ nullable: true })
        .isMongoId()
        .withMessage(`${field} must be an ObjectId or Null`);
};
const validateNumber = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty()
            .withMessage(`${field} is required`)
            .isNumeric()
            .withMessage(`${field} must is number`);
    }
    return check([field]).optional({ checkFalsy: true }).isNumeric()
        .withMessage(`${field} must is number`);
};
const validateBoolean = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty()
            .withMessage(`${field} is required`)
            .isBoolean()
            .withMessage(`${field} must is true or false`);
    }
    return check([field]).optional({ checkFalsy: true }).isNumeric()
        .withMessage(`${field} must is number`);
};
const validateDateByFormat = (field, format = null, required = false) => {
    if (required) {
        return check([field]).notEmpty()
            .withMessage(`${field} is required`)
            .custom((value) => isValidDate(value, format))
            .withMessage(`${field} must be format ${format}`);
    }
    return check([field]).optional()
        .custom((value) => isValidDate(value, format) || (value === ''))
        .withMessage(`${field} must be format ${format}`);
};
const validateEnum = (field, enumData, required = false) => {
    if (required) {
        return check([field]).notEmpty()
            .withMessage(`${field} is required`)
            .custom((value) => enumData.includes(value))
            .withMessage(`${field} must be in ${enumData}`);
    }
    return check([field]).optional({ checkFalsy: true }).custom((value) => enumData.includes(value))
        .withMessage(`${field} must be in ${enumData}`);
};
module.exports = {
    validateObjectId,
    validateNumber,
    validateDateByFormat,
    validateEnum,
    validateBoolean,
};
