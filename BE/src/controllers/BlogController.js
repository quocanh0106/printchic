require('dotenv').config()
const BlogService = require('../services/BlogService');
const { upload, uploadMultipleImage } = require('../configs/configMulter');
const moment = require('moment-timezone');
const CategoryBlogService = require('../services/CategoryBlogService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    convertToObjectId,
    findDuplicateIndexes,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatBlogIdValidator, validateBlogValidator } = require('../validators/BlogValidator');

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

            let fieldExistTitle = []
            const checkExistProductCategory_UK = await BlogService.checkExist({titleUK: req.body?.titleUK})
            const checkExistProductCategory_US = await BlogService.checkExist({titleUS: req.body?.titleUS})
            const checkExistProductCategory_FR = await BlogService.checkExist({titleFR: req.body?.titleFR})
            const checkExistProductCategory_DE = await BlogService.checkExist({titleDE: req.body?.titleDE})
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
                return res.json(responseError(10705, fieldExistTitle));
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
                return res.json(responseSuccess(10702, result));
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
            const { blogId } = req.query;
            const result = await BlogService.findByConditions({
                blogId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10704, result));
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

            let fieldExistTitle = []
            const checkExistProductCategory_UK = await BlogService.checkExist({titleUK: req.body?.titleUK})
            const checkExistProductCategory_US = await BlogService.checkExist({titleUS: req.body?.titleUS})
            const checkExistProductCategory_FR = await BlogService.checkExist({titleFR: req.body?.titleFR})
            const checkExistProductCategory_DE = await BlogService.checkExist({titleDE: req.body?.titleDE})
            if(checkExistProductCategory_UK && checkExistProductCategory_UK?._id.toHexString() !== req.body.blogId) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && checkExistProductCategory_US?._id.toHexString() !== req.body.blogId) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && checkExistProductCategory_FR?._id.toHexString() !== req.body.blogId) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && checkExistProductCategory_DE?._id.toHexString() !== req.body.blogId) {
                fieldExistTitle.push('titleDE')
            }
            if (fieldExistTitle.length > 0) {
                return res.json(responseError(10705, fieldExistTitle));
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

    validate: async (req, res) => {
        try {
            let errorsExistTitle = []
            let errorsNotFoundCategoryBlogId = []

            const errors = await validateResult(validateBlogValidator, req)

            const promises = req.body.listBlog.map(async (ele, index) => {
                // Check if categoryBlogId not exists
                const categoryBlog = await CategoryBlogService.findByConditions({
                    categoryBlogId: ele.categoryBlogId,
                })
                if (categoryBlog == null) {
                    errorsNotFoundCategoryBlogId.unshift({
                        value: '',
                        msg: 'Can not find category by categoryBlogId',
                        param: `listBlog[${index}].categoryBlogId`,
                        location: 'body'
                    })
                }

                // Check if the list has records with title already exist
                const result = await BlogService.checkExist({
                    title: ele.title,
                })
                if (result) {
                    errorsExistTitle.unshift({
                        value: '',
                        msg: 'Category blog already exists',
                        param: `listBlog[${index}].title`,
                        location: 'body'
                    })
                }
            })

            // Check if the list has records with the same title
            const duplicateTitleErrors = findDuplicateIndexes(req.body.listBlog, 'title')[0]?.map(ele => {
                return {
                    value: '',
                    msg: 'The excel file has 2 records with the same title',
                    param: `listBlog[${ele}].title`,
                    location: 'body'
                }
            }) || [];

            // Wait for all promises to resolve
            await Promise.all(promises);
            const listError = [...errors, ...duplicateTitleErrors, ...errorsExistTitle, ...errorsNotFoundCategoryBlogId]
            if (!isEmpty(listError)) {
                return res.json(responseError(40004, listError));
            } else {
                return res.json(responseSuccess(10706));
            }
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}