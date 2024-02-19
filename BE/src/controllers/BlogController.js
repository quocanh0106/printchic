require('dotenv').config()
const BlogService = require('../services/BlogService');
const { upload, uploadMultipleImage } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    convertToObjectId,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatBlogIdValidator } = require('../validators/BlogValidator');

module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Danh sách tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await BlogService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10601, result));
            }
            return res.json(responseSuccess(10601, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    create: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Tạo mới tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        // beforeUploadMulti(req, res, async () => {

        try {
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            if (req.file) {
                req.body.img = req.file.path;
            } else {
                return res.json(responseError("bannerImg must be required!"))
            }

            const checkExistBlog = await BlogService.checkExist(req.body)
            if (checkExistBlog) {
                return res.json(responseSuccess(10705,[]));
            }

            const result = await BlogService.create(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10700, result));
            }
            return res.json(responseSuccess(40211, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
        // })

    },
    delete: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Xóa tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateCatBlogIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { blogId } = req.query;
            const result = await BlogService.updateDelete({
                blogId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10602, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'cập nhật tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            if (req.file) {
                req.body.img = req.file.path;
            }

            const checkExistBlog = await BlogService.checkExist(req.body)
            if (checkExistBlog && checkExistBlog?._id.toHexString() !== req.body.blogId) {
                return res.json(responseSuccess(10705,[]));
            }

            const result = await BlogService.updateConditions(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10603, result));
            }
            return res.json(responseSuccess(40213, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}