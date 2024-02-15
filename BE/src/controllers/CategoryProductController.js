require('dotenv').config()
const CategoryProductService = require('../services/CategoryProductService');
const { upload, uploadMultipleImage } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
    urlFromFilename,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatProIdValidator } = require('../validators/NewsValidator');
const CloudinaryService = require('../services/CategoryProductService');
const beforeUploadMulti = (req, res, next) => {
    uploadMultipleImage(req, res, (err) => {
        if (err) return res.json(responseError(40005))
        if (isEmpty(req.files)) return res.json(responseError(40115))
        return next();
    });
};

module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Danh sách tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await CategoryProductService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10392, result));
            }
            return res.json(responseSuccess(10392, []));
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
                req.body.bannerImg = req.file.path;
            } else {
                return res.json(responseError("bannerImg must be required!"))
            }
            const result = await CategoryProductService.create(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10391, result));
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
            const errors = await validateResult(validateCatProIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { categoryProductId } = req.query;
            const result = await CategoryProductService.updateDelete({
                categoryProductId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10393, result));
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
                req.body.bannerImg = req.file.path;
            } else {
                return res.json(responseError("bannerImg must be required!"))
            }
            const result = await CategoryProductService.updateConditions(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10394, result));
            }
            return res.json(responseSuccess(40213, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}
module.exports.DEFAULT = {
    list: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Danh sách tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await CategoryProductService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10392, result));
            }
            return res.json(responseSuccess(10392, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    info: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Chi tiết tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateNewObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const result = await CategoryProductService.findByConditions({
                newObjId: req.query.newObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10394, result));
            }
            return res.json(responseSuccess(40214, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}