const { check } = require('express-validator');
const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');
const { GENDER_FOR_WORK } = require('../utils/constants');

const registerValidator = [
    check('email').notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không đúng định dạng!'),
    check('name').notEmpty().withMessage('Bạn phải điền đầy đủ tên của bạn'),
];
const loginValidator = [
    check('email').notEmpty().withMessage('email must be required'),
    check('password').notEmpty().withMessage('password must be required'),
]
const forgotValidator = [
    check('email').notEmpty().withMessage('email must be required'),
]
const verifyValidator = [
    check('email').notEmpty().withMessage('email must be required'),
    check('verifyCode').notEmpty().withMessage('verifyCode must be required'),
]
const resetPWValidator = [
    check('email').notEmpty().withMessage('email must be required'),
    check('password').notEmpty().withMessage('password must be required'),
    check('confirmPassword').notEmpty().withMessage('confirmPassword must be required'),
]
const updateValidator = [
    check('phoneNumber').optional().isMobilePhone().withMessage('phoneNumber must be phone number format'),
    check('email').optional().isEmail().withMessage('email must be email format'),
    validateEnum('gender', GENDER_FOR_WORK),
    validateObjectId('userObjId', true),
];
const chargingValidator = [
    validateObjectId('userObjId', true),
    validateNumber('chargingMoney', true),
];
const upgradeValidator = [
    // validateObjectId('userObjId', true),
    validateObjectId('vipObjId', true),
    check('price').notEmpty().withMessage('price must be required'),
]
const userObjIdValidator = [
    validateObjectId('userObjId', true),
]
const changePasswordValidator = [
    check('password').notEmpty().withMessage('password must be required'),
]


const changePasswordUserValidator = [
    check('password').notEmpty().withMessage('password must be required'),
    check('currentPW').notEmpty().withMessage('currentPW must be required'),
]

const trackingBusinessObjIdValidator = [
    validateObjectId('trackingBusinessObjId', true),
]


module.exports = {
    registerValidator,
    loginValidator,
    forgotValidator,
    verifyValidator,
    resetPWValidator,
    updateValidator,
    chargingValidator,
    upgradeValidator,
    userObjIdValidator,
    changePasswordValidator,
    changePasswordUserValidator,
    trackingBusinessObjIdValidator,
};