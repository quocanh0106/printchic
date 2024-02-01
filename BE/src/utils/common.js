const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const { generatorTime, responseError } = require('./shared');
const configJwt = require('../configs/configJWT');
const PostsService = require('../services/PostsService');
const UsersService = require('../services/UsersService');
const AdvertisementsService = require('../services/AdvertisementsService');
const TrackingBusinessesService = require('../services/TrackingBusinessesService');
const ChargingProfilesService = require('../services/ChargingProfilesService');
const { STATUS_POST, STATUS_USER, STATUS, TYPE_USER } = require('./constants');
const { isEmpty } = require('./shared');
module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'] || req.body.token || req.query.token;
            if (!token) {
                return res.json(responseError(40001));
            }
            jwt.verify(token, configJwt.secret, async (err, decoded) => {
                if (err) {
                    return res.json(responseError(40005));
                }
                req.decoded = {
                    ...decoded,
                };
                return next();
            });
        } catch (errors) {
            if (errors.name === 'JsonWebTokenError') {
                return res.json(responseError(40004, errors));
            }
            return res.json(responseError(40004, errors));
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const { type } = req.decoded;
            if (type !== TYPE_USER[2]) {
                return res.json(responseError(40006));
            }
            return next();
        } catch (errors) {
            return res.json(responseError(40004, errors));

        }
    },
    isHR: async (req, res, next) => {
        try {
            const { type } = req.decoded;
            if (type !== TYPE_USER[0] && type !== TYPE_USER[2]) {
                return res.json(responseError(40007));
            }
            return next();
        } catch (errors) {
            return res.json(responseError(40004, errors));

        }
    },
    expiredPost: async () => {
        try {
            const allPosts = await PostsService.findByConditions({
                postStatuses: ['HOT', 'URGENT'],
                getAll: true,
            });
            for (let i = 0; i < allPosts.length; i++) {
                const post = allPosts[i];
                const expiredUpgradePost = post.expiredUpgradePost;
                // update expired post
                if (isEmpty(expiredUpgradePost) || moment(expiredUpgradePost, 'YYYY-MM-DD HH:mm:ss').isBefore(moment())) {
                    await PostsService.updateStatus({
                        postObjId: post?._id,
                        postStatus: STATUS_POST[2], // NORMAL
                        expiredUpgradePost: '',
                    })
                }
            }
        } catch (errors) {
            console.log(errors, 'errors');
        }
    },
    expiredVipUser: async () => {
        try {
            const findAllTrackings = await TrackingBusinessesService.findByConditions({
                getAll: true,
            })
            for (let i = 0; i < findAllTrackings.length; i++) {
                const tracking = findAllTrackings[i];
                const userObjId = tracking?.userObjId;
                const expiredTime = tracking.expiredTime;
                // update expired trust user
                if (isEmpty(expiredTime) || moment(expiredTime, 'YYYY-MM-DD HH:mm:ss').isBefore(moment())) {
                    await UsersService.updateStatusUser({
                        userObjId: userObjId,
                        statusUser: STATUS_USER[1], // NORMAL
                        expireTruth: '',
                        trackingBusinessObjId: null,
                    })
                    await TrackingBusinessesService.updateDelete({
                        trackingBusinessObjId: tracking?._id,
                    })
                }
            }
            console.log('Job scan vip successfully ...')
        } catch (errors) {
            console.log(errors, 'errors');
        }
    },
    inactivePost: async () => {
        try {
            const allPosts = await PostsService.findByConditions({
                status: STATUS[100], // active
                getAll: true,
            });
            for (let i = 0; i < allPosts.length; i++) {
                const post = allPosts[i];
                const expiredDate = post.expiredDate;
                if ((isEmpty(expiredDate) || moment(expiredDate, 'YYYY-MM-DD HH:mm:ss').isBefore(moment()))) {
                    await PostsService.inactive({
                        postObjId: post?._id,
                        trackingBusinessObjId: null,
                    })
                }
            }
            console.log('Job scan expired post successfully ...')
        } catch (errors) {
            console.log(errors, 'errors');
        }
    },
    // delete advertisement when expired
    delExpiredAdvertisement: async () => {
        try {
            const allAdvertisements = await AdvertisementsService.findByConditions({
                getAll: true,
            });
            for (let i = 0; i < allAdvertisements.length; i++) {
                const advertisement = allAdvertisements[i];
                const endDate = advertisement.endDate;
                const advertisementObjId = advertisement._id;
                // delete advertisement when expired
                if (isEmpty(endDate) || moment(endDate, 'YYYY-MM-DD').isBefore(moment(), 'day')) {
                    await AdvertisementsService.updateDelete({
                        advertisementObjId,
                    })
                }
            }
            console.log('Job scan delete advertisement successfully ...')

        } catch (errors) {
            console.log(errors, 'errors');
        }
    },
    // expired profile
    expiredChargingProfiles: async () => {
        try {
            const allPurchasedProfiles = await ChargingProfilesService.findByConditions({
                getAll: true,
            });
            for (let i = 0; i < allPurchasedProfiles.length; i++) {
                const purchasedProfile = allPurchasedProfiles[i];
                const expiredTime = purchasedProfile.expiredTime;
                const chargingProfileObjId = purchasedProfile._id;
                if (isEmpty(expiredTime) || moment(expiredTime, 'YYYY-MM-DD').isBefore(moment(), 'day')) {
                    await ChargingProfilesService.updateDelete({
                        chargingProfileObjId,
                    })
                }
            }
            console.log('Job scan expired charging profile successfully ...')

        } catch (errors) {
            console.log(errors, 'errors');
        }
    },
}