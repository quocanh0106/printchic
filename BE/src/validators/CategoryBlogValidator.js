const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('handleUrl').notEmpty().withMessage('handleUrl must be required'),
    check('metaDescription').notEmpty().withMessage('metaDescription must be required'),
    check('titleUK').notEmpty().withMessage('Title UK must be required'),
    check('titleUS').notEmpty().withMessage('Title US must be required'),
    check('titleDE').notEmpty().withMessage('Title DE must be required'),
    check('titleFR').notEmpty().withMessage('Title FR must be required'),
    check('descriptionUK').notEmpty().withMessage('description UK must be required'),
    check('descriptionUS').notEmpty().withMessage('description US must be required'),
    check('descriptionDE').notEmpty().withMessage('description DE must be required'),
    check('descriptionFR').notEmpty().withMessage('description FR must be required'),
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
