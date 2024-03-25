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
    findDuplicateIndexes,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatProIdValidator, validateValidator } = require('../validators/CategoryProductValidator');
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

            let fieldExistTitle = []
            const checkExistProductCategory_UK = req.body?.titleUK ? await CategoryProductService.checkExist({titleUK: req.body?.titleUK}) : false;
            const checkExistProductCategory_US = req.body?.titleUS ? await CategoryProductService.checkExist({titleUS: req.body?.titleUS}) : false;
            const checkExistProductCategory_FR = req.body?.titleFR ? await CategoryProductService.checkExist({titleFR: req.body?.titleFR}) : false;
            const checkExistProductCategory_DE = req.body?.titleDE ? await CategoryProductService.checkExist({titleDE: req.body?.titleDE}) : false;
            if(checkExistProductCategory_UK && req.body?.titleUK) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && req.body?.titleUS) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && req.body?.titleFR) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && req.body?.titleDE) {
                fieldExistTitle.push('titleDE')
            }
            if (checkExistProductCategory_UK || checkExistProductCategory_US || checkExistProductCategory_FR || checkExistProductCategory_DE) {
                return res.json(responseError(10505, fieldExistTitle));
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
                return res.json(responseSuccess(10502, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    info: async (req, res) => {
        try {
            const errors = await validateResult(validateCatProIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { categoryProductId } = req.query;
            const result = await CategoryProductService.findByConditions({
                categoryProductId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10501, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    validate: async (req, res) => {
        try {
            let errorsNotFoundCategoryParent = []
            let errorsExistTitle = []

            const errors = await validateResult(validateValidator, req)

            // Check if parentCategory does not exist in database
            const promises = req.body.listCategoryProduct.map(async (ele, index) => {
                if (ele.parentCategory) {
                    const result = await CategoryProductService.findByConditions({
                        categoryProductId: ele.parentCategory,
                    })
                    if (result == null) {
                        errorsNotFoundCategoryParent.unshift({
                            value: '',
                            msg: 'Can not find category by parentCategory',
                            param: `listCategoryProduct[${index}].parentCategory`,
                            location: 'body'
                        })
                    }
                }

                // Check if the list has records with title already exist
                const result = await CategoryProductService.checkExist({
                    title: ele.title,
                })
                console.log('result',result)
                if (result) {
                    errorsExistTitle.unshift({
                        value: '',
                        msg: 'Category product already exists',
                        param: `listCategoryProduct[${index}].title`,
                        location: 'body'
                    })
                }
            })

            // Check if the list has records with the same title
            const duplicateTitleErrors = findDuplicateIndexes(req.body.listCategoryProduct, 'title')[0]?.map(ele => {
                return {
                    value: '',
                    msg: 'The excel file has 2 records with the same title',
                    param: `listCategoryProduct[${ele}].title`,
                    location: 'body'
                }
            }) || [];

            console.log('errorsExistTitle',errorsExistTitle)

            // Wait for all promises to resolve
            await Promise.all(promises);
            const listError = [...errorsNotFoundCategoryParent, ...errors, ...duplicateTitleErrors, ...errorsExistTitle]
            if (!isEmpty(listError)) {
                return res.json(responseError(40004, listError));
            } else {
                return res.json(responseSuccess(10506));
            }
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
            }

            let fieldExistTitle = []
            const checkExistProductCategory_UK = req.body?.titleUK ? await CategoryProductService.checkExist({titleUK: req.body?.titleUK}) : false;
            const checkExistProductCategory_US = req.body?.titleUS ? await CategoryProductService.checkExist({titleUS: req.body?.titleUS}) : false;
            const checkExistProductCategory_FR = req.body?.titleFR ? await CategoryProductService.checkExist({titleFR: req.body?.titleFR}) : false;
            const checkExistProductCategory_DE = req.body?.titleDE ? await CategoryProductService.checkExist({titleDE: req.body?.titleDE}) : false;
            if(checkExistProductCategory_UK && req.body?.titleUK && checkExistProductCategory_UK?._id.toHexString() !== req.body.categoryProductId) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && req.body?.titleUS && checkExistProductCategory_US?._id.toHexString() !== req.body.categoryProductId) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && req.body?.titleFR && checkExistProductCategory_FR?._id.toHexString() !== req.body.categoryProductId) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && req.body?.titleDE && checkExistProductCategory_DE?._id.toHexString() !== req.body.categoryProductId) {
                fieldExistTitle.push('titleDE')
            }
            if (fieldExistTitle.length > 0) {
                return res.json(responseError(10505, fieldExistTitle));
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