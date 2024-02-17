const { check } = require('express-validator');

const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('title').notEmpty().withMessage('title must be required'),
    check('description').notEmpty().withMessage('description must be required')
]
const updateValidator = [
    check('siteName').notEmpty().withMessage('siteName must be required'),
    check('metaTitle').notEmpty().withMessage('metaTitle must be required'),
    check('metaDescription').notEmpty().withMessage('metaDescription must be required'),
    check('headTag').notEmpty().withMessage('imageFeature must be required'),
    check('footerTag').notEmpty().withMessage('footerTag must be required'),
    check('headEmbedAll').notEmpty().withMessage('headEmbedAll must be required'),
    check('headTagAll').notEmpty().withMessage('headTagAll must be required'),
    check('footerTagAll').notEmpty().withMessage('footerTagAll must be required'),
    validateObjectId('settingId', true),
]
const validateCatProIdValidator = validateObjectId('categoryProductId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatProIdValidator,
};
