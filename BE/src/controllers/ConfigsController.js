require('dotenv').config()
const ConfigsService = require('../services/ConfigsService');
const PostsService = require('../services/PostsService');
const TrackingBusinessesService = require('../services/TrackingBusinessesService');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');
const {
    CONFIG_TYPE, YES_NO
} = require('../utils/constants');
const { updateValidator } = require('../validators/ConfigsValidator');
const calculatePriceVip = async (config, tracking) => {
    try {
        if (isEmpty(tracking)) return Promise.resolve(+config?.value);
        const currentLevel = +tracking?.vipObjId?.level;
        const upgradeLevel = +config?.level;
        if (currentLevel <= upgradeLevel) return Promise.resolve(+config?.value);
        const currentPriceConfig = +tracking?.vipObjId?.value;
        const upgradePriceConfig = +config?.value;
        // giá tiền chênh lệch
        const diffPrice = +upgradePriceConfig - +currentPriceConfig >= 0 ? upgradePriceConfig - currentPriceConfig : 0;
        const postsPackage = +tracking?.vipObjId?.detail?.expiredPost;
        const findUsedPost = await PostsService.findByConditions({
            trackingBusinessObjId: tracking?._id,
            getAll: true,
        })
        const totalUsedPost = findUsedPost?.length || 0;
        // số tiền đã sử dụng
        const usedPrice = (currentPriceConfig / postsPackage) * totalUsedPost;
        paidMoney = diffPrice + usedPrice;
        return Promise.resolve(paidMoney);
    } catch (err) {
        return Promise.reject(err);
    }
}
module.exports.AUTH = {

    list: async (req, res) => {
        // #swagger.tags = ['Setting price'] 
        // #swagger.summary = 'Danh sách cài đặt tiền'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await ConfigsService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10240, result));
            }
            return res.json(responseSuccess(10240, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['Setting price'] 
        // #swagger.summary = 'Update cài đặt tiền'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['configObjId'] = {
         in: 'body',
         description: 'id của config',
         required: true,
         type: 'string',
         } */
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { configObjId, value } = req.body;
            const findConfig = await ConfigsService.findByConditions({
                configObjId,
            })
            // if (findConfig?.canUpdate === YES_NO[100]) {
            //     return res.json(responseError(40151));
            // }
            const result = await ConfigsService.updateConditions({
                configObjId,
                value,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10241, result));
            }
            return res.json(responseError(40150, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listAdvertisement: async (req, res) => {
        // #swagger.tags = ['Landing'] 
        // #swagger.summary = 'Danh sách cài đặt quảng cáo'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await ConfigsService.findByConditions({
                ...req.query,
                type: CONFIG_TYPE[100],
                getAll: true,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10240, result));
            }
            return res.json(responseSuccess(10240, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listVip: async (req, res) => {
        // #swagger.tags = ['User'] 
        // #swagger.summary = 'Danh sách cài đặt vip'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            const findTracking = await TrackingBusinessesService.findByConditions({
                userObjId,
            });
            const result = await ConfigsService.findByConditions({
                ...req.query,
                type: CONFIG_TYPE[200],
                getAll: true,
            })
            for (let i = 0; i < result.length; i++) {
                const value = await calculatePriceVip(result[i], findTracking);
                result[i].value = value;
            }
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10240, result));
            }
            return res.json(responseSuccess(10240, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listUploadPost: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Danh sách cài đặt up bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            const findTracking = await TrackingBusinessesService.findByConditions({
                userObjId,
            });
            const result = await ConfigsService.findByConditions({
                ...req.query,
                type: CONFIG_TYPE[300],
                getAll: true,
            })
            if (!isEmpty(findTracking)) {
                result.push(findTracking?.vipObjId);
            }
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10240, result));
            }
            return res.json(responseSuccess(10240, []));
        } catch (errors) {
            return res.json(responseError(40004, errors));
        }
    },
    listPurchaseUser: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Danh sách cài đặt up bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            const findTracking = await TrackingBusinessesService.findByConditions({
                userObjId,
            });
            const result = await ConfigsService.findByConditions({
                configCode: "CF_002",
                getAll: true,
            })
            if (!isEmpty(findTracking)) {
                result.push(findTracking?.vipObjId);
            }
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10240, result));
            }
            return res.json(responseSuccess(10240, []));
        } catch (errors) {
            return res.json(responseError(40004, errors));
        }
    },
}
