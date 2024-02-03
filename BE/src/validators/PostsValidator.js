const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');
const { GENDER_FOR_WORK } = require('../utils/constants');

const createValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    validateObjectId('configObjId', true),
    validateObjectId('provinceObjId'),
    // check('companyObjId').notEmpty().withMessage('companyObjId must be required'),
    check('jobObjId').notEmpty().withMessage('jobObjId must be required'),
    check('jobDescription').notEmpty().withMessage('jobDescription must be required'),
    validateNumber('salary', true),
    validateNumber('expectedIncome', true),
    // check('salary').notEmpty().withMessage('salary must be required'),
    // check('expectedIncome').notEmpty().withMessage('expectedIncome must be required'),
    validateBoolean('isOverTime', true),
    check('benefit').notEmpty().withMessage('benefit must be required'),
    validateNumber('numberOfRecruits', true),
    check('contractObjId').notEmpty().withMessage('contractObjId must be required'),
    validateEnum('gender', GENDER_FOR_WORK, true),
    validateDateByFormat('fromBorn', 'YYYY-MM-DD HH:mm:ss', true),
    validateDateByFormat('endBorn', 'YYYY-MM-DD HH:mm:ss', true),
];
const createInternalValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    check('companyObjId').notEmpty().withMessage('companyObjId (tên công ty) must be required'),
    check('jobDescription').notEmpty().withMessage('jobDescription (mô tả công việc) must be required'),
    validateNumber('salary', true),
    check('benefit').notEmpty().withMessage('benefit (các quyền lợi) must be required'),
    validateNumber('numberOfRecruits', true),
    validateDateByFormat('expiredDate', 'YYYY-MM-DD', true),
    check('examPlace').notEmpty().withMessage('examPlace (nơi thi tuyển) must be required'),
    check('companyAddress').notEmpty().withMessage('companyAddress (địa chỉ công ty) must be required'),
    check('workingTime').notEmpty().withMessage('workingTime (thời gian làm việc) must be required'),

];
const updateValidator = [
    // ...createValidator,
    validateObjectId('postObjId', true),
];
const updateInternalValidator = [
    // ...createValidator,
    validateObjectId('postObjId', true),
];
const upgradePostValidator = [
    validateObjectId('postObjId', true),
];
const applyValidator = [
    validateObjectId('postObjId', true),
];
const purchaseProfileValidator = [
    validateObjectId('candidateObjId', true),
    // validateObjectId('configObjId', true),
];
const approveValidator = [
    validateObjectId('postObjId', true),
    check('isApprove').notEmpty().withMessage('isApprove must be required'),
];
const postObjIdValidator = validateObjectId('postObjId', true);
module.exports = {
    createValidator,
    updateValidator,
    postObjIdValidator,
    upgradePostValidator,
    applyValidator,
    purchaseProfileValidator,
    approveValidator,
    createInternalValidator,
    updateInternalValidator,
};
