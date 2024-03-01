const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('titleUK').notEmpty().withMessage('titleUK must be required'),
    check('titleUS').notEmpty().withMessage('titleUS must be required'),
    check('titleDE').notEmpty().withMessage('titleDE must be required'),
    check('titleFR').notEmpty().withMessage('titleFR must be required'),
    check('contentUK').notEmpty().withMessage('contentUK must be required'),
    check('contentUS').notEmpty().withMessage('contentUS must be required'),
    check('contentDE').notEmpty().withMessage('contentDE must be required'),
    check('contentFR').notEmpty().withMessage('contentFR must be required'),
    validateObjectId('categoryBlogId', true),
    check('status').notEmpty().withMessage('status must be required'),
]
const updateValidator = [
    ...createValidator,
    validateObjectId('blogId', true),
]

const validateBlogValidator = [
    check('listBlog.*.title').notEmpty().withMessage('title must be required'),
    check('listBlog.*.categoryBlogId').notEmpty().withMessage('categoryBlogId must be required'),
    check('listBlog.*.status').notEmpty().withMessage('status must be required'),
    check('listBlog.*.img').notEmpty().withMessage('img must be required'),
    check('listBlog.*.content').notEmpty().withMessage('content must be required'),
]

const validateCatBlogIdValidator = validateObjectId('blogId', true);
module.exports = {
    createValidator,
    updateValidator,
    validateCatBlogIdValidator,
    validateBlogValidator,
};
