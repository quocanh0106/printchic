const { check } = require('express-validator');

const { validateObjectId } = require('./validatorCommon');

const createValidator = [
    check('titleUS').notEmpty().withMessage('titleUS must be required'),
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
