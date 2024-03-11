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
            // if(req.query.categoryObjId){
            //     const result = await ProductService.list({
            //         ...req.query.categoryObjId
            //     })
            //     console.log(result, 'KKAKKA')
            //     if (!isEmpty(result)) {
            //         return res.json(responseSuccess(10501, result));
            //     }
            //     return res.json(responseSuccess(10501, []));
            // }
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

            let fieldExistTitle = []
            const checkExistProductCategory_UK = await ProductService.checkExist({titleUK: req.body?.titleUK})
            const checkExistProductCategory_US = await ProductService.checkExist({titleUS: req.body?.titleUS})
            const checkExistProductCategory_FR = await ProductService.checkExist({titleFR: req.body?.titleFR})
            const checkExistProductCategory_DE = await ProductService.checkExist({titleDE: req.body?.titleDE})
            if(checkExistProductCategory_UK) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE) {
                fieldExistTitle.push('titleDE')
            }
            if (checkExistProductCategory_UK || checkExistProductCategory_US || checkExistProductCategory_FR || checkExistProductCategory_DE) {
                return res.json(responseError(10805, fieldExistTitle));
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

            let fieldExistTitle = []
            const checkExistProductCategory_UK = await ProductService.checkExist({titleUK: req.body?.titleUK})
            const checkExistProductCategory_US = await ProductService.checkExist({titleUS: req.body?.titleUS})
            const checkExistProductCategory_FR = await ProductService.checkExist({titleFR: req.body?.titleFR})
            const checkExistProductCategory_DE = await ProductService.checkExist({titleDE: req.body?.titleDE})
            if(checkExistProductCategory_UK && checkExistProductCategory_UK?._id.toHexString() !== req.body.productId) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && checkExistProductCategory_US?._id.toHexString() !== req.body.productId) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && checkExistProductCategory_FR?._id.toHexString() !== req.body.productId) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && checkExistProductCategory_DE?._id.toHexString() !== req.body.productId) {
                fieldExistTitle.push('titleDE')
            }
            if (fieldExistTitle.length > 0) {
                return res.json(responseError(10805, fieldExistTitle));
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