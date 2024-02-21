const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('handleUrl').notEmpty().withMessage('handleUrl must be required'),
    check('metaDescription').notEmpty().withMessage('metaDescription must be required'),
    check('title').notEmpty().withMessage('title must be required'),
    check('description').notEmpty().withMessage('description must be required')
]
const updateValidator = [
    ...createValidator,
    validateObjectId('categoryBlogId', true),
]

const validateCatBlogValidator = [
    check('listCategoryBlog.*.title').notEmpty().withMessage('title must be required'),
    check('listCategoryBlog.*.description').notEmpty().withMessage('description must be required'),
    check('listCategoryBlog.*.bannerImg').notEmpty().withMessage('bannerImg must be required'),
    check('listCategoryBlog.*.metaDescription').notEmpty().withMessage('metaDescription must be required'),
    check('listCategoryBlog.*.handleUrl').notEmpty().withMessage('handleUrl must be required'),
]

const validateCatBlogIdValidator = validateObjectId('categoryBlogId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatBlogIdValidator,
    validateCatBlogValidator,
};
