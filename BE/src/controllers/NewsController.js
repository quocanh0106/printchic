require('dotenv').config()
const NewsService = require('../services/NewsService');
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
const { createValidator, validateNewObjIdValidator, updateValidator } = require('../validators/NewsValidator');
const beforeUploadMulti = (req, res, next) => {
    uploadMultipleImage(req, res, (err) => {
        if (err) return res.json(responseError(40005))
        if (isEmpty(req.files)) return res.json(responseError(40115))
        return next();
    });
};

module.exports.AUTH = {

    create: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Tạo mới tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUploadMulti(req, res, async () => {
            try {
                const errors = await validateResult(createValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.files) {
                    const fileImg = req.files.find((file) => file.fieldname === 'image');
                    if (isEmpty(fileImg)) return res.json(responseError("image must be required!"))
                    const fileBanner = req.files.find((file) => file.fieldname === 'banner');
                    if (isEmpty(fileBanner)) return res.json(responseError("banner must be required!"))
                    req.body.image = urlFromFilename(fileImg.filename);
                    req.body.banner = urlFromFilename(fileBanner.filename);;
                }
                const { userObjId } = req.decoded;
                req.query.userObjId = userObjId;
                const result = await NewsService.create(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10391, result));
                }
                return res.json(responseSuccess(40211, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })

    },
    delete: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Xóa tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateNewObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { newObjId } = req.body;
            const result = await NewsService.updateDelete({
                newObjId,
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
        beforeUploadMulti(req, res, async () => {
            try {
                const errors = await validateResult(updateValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.files) {
                    const fileImg = req.files.find((file) => file.fieldname === 'image');
                    if (isEmpty(fileImg)) return res.json(responseError("image must be required!"))
                    const fileBanner = req.files.find((file) => file.fieldname === 'banner');
                    if (isEmpty(fileBanner)) return res.json(responseError("banner must be required!"))
                    req.body.image = urlFromFilename(fileImg.filename);
                    req.body.banner = urlFromFilename(fileBanner.filename);;
                }
                const result = await NewsService.updateConditions(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10394, result));
                }
                return res.json(responseSuccess(40213, []));

            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    active: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Hiện tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateNewObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const result = await NewsService.updateStatus({
                newObjId: req.body.newObjId,
                status: 100,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10394, result));
            }
            return res.json(responseSuccess(40213, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    inactive: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'ẩn tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateNewObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const result = await NewsService.updateStatus({
                newObjId: req.body.newObjId,
                status: 200,
            })
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
            const result = await NewsService.list({
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
            const result = await NewsService.findByConditions({
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