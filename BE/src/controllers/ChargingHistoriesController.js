require('dotenv').config()
const ChargingHistoriesService = require('../services/ChargingHistoriesService');
const { upload } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');
const { STATUS, STATUS_POST, ENTITY_TYPE_CHARGING_HISTORIES, TYPE_CHARGING_HISTORIES, } = require('../utils/constants');
const { createValidator, updateValidator, postObjIdValidator,
    upgradePostValidator } = require('../validators/PostsValidator')

module.exports.AUTH = {

    list: async (req, res) => {
        // #swagger.tags = ['Lịch sử nạp tiền'] 
        // #swagger.summary = 'Lịch sử nạp tiền của user'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            req.query.userObjId = userObjId;
            const result = await ChargingHistoriesService.listAggregate({
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
}
