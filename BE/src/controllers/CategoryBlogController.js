require('dotenv').config()
const CategoryBlogService = require('../services/CategoryBlogService');
const { upload, uploadMultipleImage } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    findDuplicateIndexes,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatBlogIdValidator, validateCatBlogValidator } = require('../validators/CategoryBlogValidator');

module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Danh sách tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await CategoryBlogService.list({
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
                req.body.bannerImg = req.file.path;
            } else {
                return res.json(responseError("bannerImg must be required!"))
            }

            let fieldExistTitle = []

            const checkExistProductCategory_UK = req.body?.titleUK ? await CategoryBlogService.checkExist({titleUK: req.body?.titleUK}) : false;
            const checkExistProductCategory_US = req.body?.titleUS ? await CategoryBlogService.checkExist({titleUS: req.body?.titleUS}) : false;
            const checkExistProductCategory_FR = req.body?.titleFR ? await CategoryBlogService.checkExist({titleFR: req.body?.titleFR}) : false;
            const checkExistProductCategory_DE = req.body?.titleDE ? await CategoryBlogService.checkExist({titleDE: req.body?.titleDE}) : false;
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
                return res.json(responseError(10605, fieldExistTitle));
            }

            const result = await CategoryBlogService.create(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10600, result));
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
            const { categoryBlogId } = req.query;
            const result = await CategoryBlogService.updateDelete({
                categoryBlogId,
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
    info: async (req, res) => {
        try {
            const errors = await validateResult(validateCatBlogIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { categoryBlogId } = req.query;
            const result = await CategoryBlogService.findByConditions({
                categoryBlogId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10601, result));
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
            }

            let fieldExistTitle = []
            const checkExistProductCategory_UK = req.body?.titleUK ? await CategoryBlogService.checkExist({titleUK: req.body?.titleUK}) : false;
            const checkExistProductCategory_US = req.body?.titleUS ? await CategoryBlogService.checkExist({titleUS: req.body?.titleUS}) : false;
            const checkExistProductCategory_FR = req.body?.titleFR ? await CategoryBlogService.checkExist({titleFR: req.body?.titleFR}) : false;
            const checkExistProductCategory_DE = req.body?.titleDE ? await CategoryBlogService.checkExist({titleDE: req.body?.titleDE}) : false;
            if(checkExistProductCategory_UK && req.body?.titleUK && checkExistProductCategory_UK?._id.toHexString() !== req.body.categoryBlogId) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && req.body?.titleUS && checkExistProductCategory_US?._id.toHexString() !== req.body.categoryBlogId) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && req.body?.titleFR && checkExistProductCategory_FR?._id.toHexString() !== req.body.categoryBlogId) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && req.body?.titleDE && checkExistProductCategory_DE?._id.toHexString() !== req.body.categoryBlogId) {
                fieldExistTitle.push('titleDE')
            }
            if (fieldExistTitle.length > 0) {
                return res.json(responseError(10605, fieldExistTitle));
            }

            const result = await CategoryBlogService.updateConditions(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10603, result));
            }
            return res.json(responseSuccess(40213, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    validate: async (req, res) => {
        try {
            let errorsExistTitle = []
            let errorsExistHandleUrl = []

            const errors = await validateResult(validateCatBlogValidator, req)

            const promises = req.body.listCategoryBlog.map(async (ele, index) => {

                // Check if the list has records with title already exist
                const result = await CategoryBlogService.checkExist({
                    title: ele.title,
                })
                if (result) {
                    errorsExistTitle.unshift({
                        value: '',
                        msg: 'Category blog already exists',
                        param: `listCategoryBlog[${index}].title`,
                        location: 'body'
                    })
                }

                // Check if the list has records with handleUrl already exist
                const resultHandleUrl = await CategoryBlogService.checkExist({
                    handleUrl: ele.handleUrl,
                })
                if (resultHandleUrl) {
                    errorsExistHandleUrl.unshift({
                        value: '',
                        msg: 'Category blog already exists',
                        param: `listCategoryBlog[${index}].handleUrl`,
                        location: 'body'
                    })
                }
            })

            // Check if the list has records with the same title
            const duplicateTitleErrors = findDuplicateIndexes(req.body.listCategoryBlog, 'title')[0]?.map(ele => {
                return {
                    value: '',
                    msg: 'The excel file has 2 records with the same title',
                    param: `listCategoryBlog[${ele}].title`,
                    location: 'body'
                }
            }) || [];

            // Check if the list has records with the same title
            const duplicateHandleUrlErrors = findDuplicateIndexes(req.body.listCategoryBlog, 'handleUrl')[0]?.map(ele => {
                return {
                    value: '',
                    msg: 'The excel file has 2 records with the same handle url',
                    param: `listCategoryBlog[${ele}].handleUrl`,
                    location: 'body'
                }
            }) || [];

            // Wait for all promises to resolve
            await Promise.all(promises);
            const listError = [...errorsExistHandleUrl, ...errors, ...duplicateTitleErrors, ...errorsExistTitle, ...duplicateHandleUrlErrors]
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
}