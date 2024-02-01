require('dotenv').config()
const ChargingProfilesService = require('../services/ChargingProfilesService');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');
const { purchaseProfileValidator } = require('../validators/PostsValidator');

module.exports.AUTH = {

    list: async (req, res) => {
        // #swagger.tags = ['Danh sách ứng viên của tôi'] 
        // #swagger.summary = 'Danh sách ứng viên của tôi'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            req.query.recruiterObjId = userObjId;
            const result = await ChargingProfilesService.listAggregate({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10213, result));
            }
            return res.json(responseSuccess(10213, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    checkPurchased: async (req, res) => {
        // #swagger.tags = ['Danh sách ứng viên của tôi'] 
        // #swagger.summary = 'Kiểm tra đã mua ứng viên chưa'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(purchaseProfileValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { candidateObjId } = req.query;
            const findProfileByUser = await ChargingProfilesService.findByConditions({
                recruiterObjId: userObjId,
                candidateObjId,
            });
            if (findProfileByUser) {
                return res.json(responseError(40127));
            }
            return res.json(responseSuccess(10238));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}
