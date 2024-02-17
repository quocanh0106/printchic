require('dotenv').config()
const SettingControllerService = require('../services/SettingControllerService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
} = require('../utils/shared');
const { updateValidator } = require('../validators/SettingControllerValidator');

module.exports.AUTH = {

    info: async (req, res) => {
        // #swagger.tags = ['Tin tức'] 
        // #swagger.summary = 'Chi tiết tin tức'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await SettingControllerService.findByConditions()
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10394, result));
            }
            return res.json(responseSuccess(40214, []));

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
                req.body.imageFeature = req.file.path;
            }
            const result = await SettingControllerService.updateConditions(req.body)
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