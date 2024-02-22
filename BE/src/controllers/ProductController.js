require('dotenv').config()
const ProductService = require('../services/ProductService');
const CategoryProductService = require('../services/CategoryProductService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateProIdValidator } = require('../validators/ProductValidator');

module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Danh sách tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await ProductService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10501, result));
            }
            return res.json(responseSuccess(10501, []));
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
            console.log('req',req.body, req.files)
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            if (req.files) {
                req.body.media = req.files;
            }

            const checkExistProduct = await ProductService.checkExist(req.body)
            if (checkExistProduct) {
                return res.json(responseSuccess(10805,[]));
            }

            const result = await ProductService.create(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10800, result));
            }
            return res.json(responseSuccess(40211, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
        // })

    },
    info: async (req, res) => {
        try {
            const errors = await validateResult(validateProIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { productId } = req.query;
            console.log('productId',productId)
            const result = await ProductService.findByConditions({
                productId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10804, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Xóa tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateProIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { productId } = req.query;
            const result = await ProductService.updateDelete({
                productId,
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
            if (req.files) {
                req.body.media = req.files;
            }

            const checkExistProduct = await CategoryProductService.checkExist(req.body)
            if (checkExistProduct && checkExistProduct?._id.toHexString() !== req.body.productId) {
                return res.json(responseSuccess(10805,[]));
            }

            const result = await ProductService.updateConditions(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10803, result));
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
            const result = await ProductService.list({
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
            const result = await ProductService.findByConditions({
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