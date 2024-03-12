const { check } = require('express-validator');

const { validateNumber, validateEnum, validateDateByFormat, validateObjectId,
    validateBoolean, } = require('./validatorCommon');

const createValidator = [
    check('titleUK').notEmpty().withMessage('Title UK must be required'),
    check('titleUS').notEmpty().withMessage('Title US must be required'),
    check('titleDE').notEmpty().withMessage('Title DE must be required'),
    check('titleFR').notEmpty().withMessage('Title FR must be required'),
    check('handleUrlUK').notEmpty().withMessage('handleUrl UK must be required'),
    check('handleUrlUS').notEmpty().withMessage('handleUrl US must be required'),
    check('handleUrlDE').notEmpty().withMessage('handleUrl DE must be required'),
    check('handleUrlFR').notEmpty().withMessage('handleUrl FR must be required'),
    check('metaDescriptionUK').notEmpty().withMessage('metaDescription UK must be required'),
    check('metaDescriptionUS').notEmpty().withMessage('metaDescription US must be required'),
    check('metaDescriptionDE').notEmpty().withMessage('metaDescription DE must be required'),
    check('metaDescriptionFR').notEmpty().withMessage('metaDescription FR must be required'),
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
