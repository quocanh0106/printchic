require('dotenv').config()
const PostsService = require('../services/PostsService');
const UsersService = require('../services/UsersService');
const ChargingHistoriesService = require('../services/ChargingHistoriesService');
const UserPostsService = require('../services/UserPostsService');
const ChargingProfilesService = require('../services/ChargingProfilesService');
const AttachmentEntitiesService = require('../services/AttachmentEntitiesService');
const AttachmentsService = require('../services/AttachmentsService');
const ConfigsService = require('../services/ConfigsService');
const TrackingBusinessesService = require('../services/TrackingBusinessesService');
const { upload, uploadMultipleImage, uploadAttachment } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlFromFilename,
    urlAttachment,
    generateExpiredTime,
    urlImage,
} = require('../utils/shared');
const { STATUS, STATUS_POST, ENTITY_TYPE_CHARGING_HISTORIES, TYPE_CHARGING_HISTORIES, ENTITY_TYPE_ATTACHMENTS, TYPE_UPLOAD_ATTACHMENT,
    CONFIG_TYPE, NOTIFICATION_TYPE, FOR_ENTITY_TYPE, POST_TYPE, CANDIDATE_TYPE } = require('../utils/constants');
const { createValidator, updateValidator, postObjIdValidator, applyValidator,
    upgradePostValidator, purchaseProfileValidator, approveValidator,
    createInternalValidator,
    updateInternalValidator } = require('../validators/PostsValidator');

const beforeUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (isEmpty(req.file)) return res.json(responseError(40115))
        return next();
    });
};
const beforeUploadUpdate = (req, res, next) => {
    upload(req, res, (err) => {
        if (!isEmpty(err)) return res.json(responseError(err))
        return next();
    });
};
const beforeUploadMulti = (req, res, next) => {
    uploadMultipleImage(req, res, (err) => {
        if (err) return res.json(responseError(40008, err))
        if (isEmpty(req.files)) return res.json(responseError(40115))
        return next();
    });
};
const beforeUploadMultiUpdate = (req, res, next) => {
    uploadMultipleImage(req, res, (err) => {
        if (err) return res.json(responseError(40008, err))
        // if (isEmpty(req.files)) return res.json(responseError(40115))
        if (!isEmpty(req.files)) {
            if (err) return res.json(responseError(40008));
        }
        return next();
    });
};
const beforeUploadAttachment = (req, res, next) => {
    uploadAttachment(req, res, (err) => {
        if (!isEmpty(err)) {
            return res.json(responseError(err));
        }
        return next();
    });
};
const checkValidateCreate = async (findConfig, trackingBusinessObjId) => {
    try {
        const configType = findConfig?.type;
        const postStatus = findConfig?.detail?.postStatus;
        const totalPerDay = findConfig?.detail?.totalPerDay;
        if (configType === CONFIG_TYPE[200]) {
            const totalFreePosts = +findConfig?.detail?.freePosts;
            const findUsedPost = await PostsService.findByConditions({
                trackingBusinessObjId,
                getAll: true,
            })
            const totalUsedPosts = findUsedPost?.length || 0;
            if (totalUsedPosts >= totalFreePosts) return 40154;
        }
        if (postStatus === STATUS_POST[100]) {
            const startToday = moment().format('YYYY-MM-DD 00:00:00');
            const endToday = moment().format('YYYY-MM-DD 23:59:00');
            const findFreePost = await PostsService.findByConditions({
                getAll: true,
                startToday,
                endToday,
                postStatus: STATUS_POST[100],
            })
            if (+findFreePost?.length >= totalPerDay) return 40155;
        }
        return '';
    } catch (err) {
        return 40004;
    }
}
module.exports.AUTH = {
    create: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Tạo mới bài đăng' 
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        // beforeUpload(req, res, async () => {
        beforeUploadMulti(req, res, async () => {
            try {
                const errors = await validateResult(createValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                const { userObjId } = req.decoded;
                const findConfig = await ConfigsService.findByConditions({
                    configObjId: req.body.configObjId,
                })
                if (isEmpty(findConfig)) return res.json(responseError(40152))
                const paidMoney = findConfig.value;
                const findUser = await UsersService.findByConditions({
                    userObjId: req.body.userObjId,
                })
                if (isEmpty(findUser)) return res.json(responseError(40122))
                const availableFund = +findUser?.availableFund;
                if (availableFund < paidMoney) return res.json(responseError(40117))
                const postStatus = findConfig?.detail?.postStatus || findConfig?.configCode;
                const expiredTime = generateExpiredTime(findConfig?.expired?.value, findConfig?.expired?.unit);
                req.body.postStatus = postStatus;
                req.body.expiredTime = expiredTime;
                const findTracking = await TrackingBusinessesService.findByConditions({
                    userObjId,
                });
                if (!isEmpty(findTracking)) {
                    req.body.trackingBusinessObjId = findTracking._id;
                }
                const resultCheckValid = await checkValidateCreate(findConfig, findTracking?._id);
                if (!isEmpty(resultCheckValid)) return res.json(responseError(resultCheckValid));
                if (req.files) {
                    const fileImg = req.files.find((file) => file.fieldname === 'image');
                    if (fileImg) {
                        req.body.image = urlFromFilename(fileImg.filename);
                    }
                    const companyLogoFile = req.files.find((file) => file.fieldname === 'companyLogo');
                    if (companyLogoFile) {
                        req.body.companyLogo = urlFromFilename(companyLogoFile.filename);
                    }
                    const arrDetailFiles = req.files.filter((file) => file.fieldname !== 'image'
                        && file.fieldname !== 'companyLogo').map((e) => urlFromFilename(e.filename));
                    req.body.detailImages = arrDetailFiles;
                }
                req.body.createdBy = userObjId;
                const result = await PostsService.create(req.body);
                if (!isEmpty(result)) {
                    await UsersService.chargeMoney({
                        userObjId,
                        availableFund: +availableFund - +paidMoney,
                        updatedBy: userObjId,
                    })
                    // create histories
                    const params = {};
                    params.entityObjId = result?._id;
                    params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[100];
                    const value = {};
                    value.price = paidMoney;
                    params.value = value;
                    params.type = TYPE_CHARGING_HISTORIES[100];
                    params.createdBy = userObjId;
                    await ChargingHistoriesService.create(params)
                    return res.json(responseSuccess(10210, result));
                }
                return res.json(responseError(40110, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
        // })
    },
    list: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Danh sách bài đăng' 
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await PostsService.listAggregate({
                ...req.query,
            })
            if (!isEmpty(result)) {
                for (let i = 0; i < result.items.length; i++) {
                    // const allApplyUsers = await UserPostsService.findByConditions({
                    //     postObjId: result.items[i]._id,
                    //     getAll: true,
                    // })
                    // result.items[i].allApplyUsers = allApplyUsers;
                }
                return res.json(responseSuccess(10213, result));
            }
            return res.json(responseSuccess(10213, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listTop: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Danh sách bài đăng landing vị trí top' 
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await PostsService.listVIP({
                ...req.query,
                postStatus: STATUS_POST[500],
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
    listBot: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Danh sách bài đăng landing vị trí bottom' 
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await PostsService.listVIP({
                ...req.query,
                postStatuses: [STATUS_POST[400], STATUS_POST[300]],
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
    listByUser: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng', 'Done'] 
        // #swagger.summary = 'Danh sách bài đăng theo user'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            req.query.userObjId = userObjId;
            const result = await PostsService.listAggregate({
                ...req.query,
                postTypes: [POST_TYPE[100], POST_TYPE[200]]
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
    info: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Chi tiết bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            // const errors = await validateResult(postObjIdValidator, req);
            // if (!isEmpty(errors)) {
            //     return res.json(responseError(40004, errors));
            // }
            const result = await PostsService.findByConditions({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10214, result));
            }
            return res.json(responseError(40116, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Xóa bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(postObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { postObjId } = req.body;
            const result = await PostsService.updateDelete({
                postObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10212, result));
            }
            return res.json(responseSuccess(40112, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    approve: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng', 'Done'] 
        // #swagger.summary = 'Phê duyệt bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['postObjId'] = {
       in: 'body',
       description: 'id của posts',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(approveValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { isApprove } = req.body;
            const findPost = await PostsService.findByConditions({
                postObjId: req.body.postObjId,
                status: STATUS[300],
            })
            if (isEmpty(findPost)) return res.json(responseError(40113));
            let result = null;
            let statusCode = 10216;
            if (isApprove) {
                let expiredDate = moment().add(1, 'months').format('YYYY-MM-DD HH:mm:ss');
                if (!isEmpty(findPost?.configObjId)) {
                    const expiredValue = findPost?.configObjId?.expired?.value;
                    const expiredUnit = findPost?.configObjId?.expired?.unit;
                    expiredConfig = generateExpiredTime(expiredValue, expiredUnit)
                    expiredDate = !isEmpty(expiredConfig) ? expiredConfig : expiredDate;
                }
                result = await PostsService.approve({
                    postObjId: req.body.postObjId,
                    expiredDate,
                })
            } else {
                if (isEmpty(req.body.reason)) return res.json(responseError(40004, [{
                    msg: 'Reason must be require',
                    param: 'reason',
                    location: 'body',
                }]));
                statusCode = 10218;
                result = await PostsService.updateStatus({
                    postObjId: req.body.postObjId,
                    status: STATUS[400],
                    reason: req.body.reason,
                })
            }
            if (!isEmpty(result)) {
                // Send notifications
                const notifyParams = {
                    senderObjId: userObjId,
                    receiverObjId: findPost?.createdBy?._id,
                    notifyType: NOTIFICATION_TYPE[100],
                    relatedObjId: findPost?._id,
                    relatedType: FOR_ENTITY_TYPE[200],
                    entity: findPost,
                    isApprove,
                }
                return res.json(responseSuccess(statusCode, result));
            }

            return res.json(responseError(40131, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Update bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUploadMultiUpdate(req, res, async () => {
            try {
                const errors = await validateResult(updateValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.files) {
                    const fileImg = req.files.find((file) => file.fieldname === 'image');
                    if (fileImg) {
                        req.body.image = urlFromFilename(fileImg.fieldname);
                    }
                    const companyLogoFile = req.files.find((file) => file.fieldname === 'companyLogo');
                    if (companyLogoFile) {
                        req.body.companyLogo = urlFromFilename(companyLogoFile.filename);
                    }
                    const arrDetailFiles = req.files.filter((file) => file.fieldname !== 'image'
                        && file.fieldname !== 'companyLogo').map((e) => urlFromFilename(e.filename));
                    req.body.detailImages = arrDetailFiles;
                }
                const { userObjId } = req.decoded;
                req.body.updatedBy = userObjId;
                const result = await PostsService.updateConditions(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10211, result));
                }
                return res.json(responseError(40111, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    upgradeHot: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Mua bài hot'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(upgradePostValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { postObjId } = req.body;
            const findPost = await PostsService.findByConditions({
                postObjId,
            })
            let expiredDate = findPost?.expiredDate ? findPost?.expiredDate : moment().add(1, 'months').format('YYYY-MM-DD HH:mm:ss');
            expiredDate = moment(expiredDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            const expiredUpgradePost = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            if (isEmpty(findPost)) return res.json(responseError(40113));
            if (['HOT', 'URGENT'].includes(findPost?.postStatus)) return res.json(responseError(40119));
            const findUser = await UsersService.findByConditions({
                userObjId,
            });
            const availableFund = +findUser?.availableFund;
            const price = 300000;
            if (availableFund < price) return res.json(responseError(40117));
            const result = await PostsService.updateStatus({
                postObjId,
                postStatus: STATUS_POST[1], // HOT
                expiredUpgradePost,
                expiredDate,
            })
            if (!isEmpty(result)) {
                // Update account balance
                await UsersService.chargeMoney({
                    userObjId,
                    availableFund: +availableFund - price,
                })
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[100];
                const value = {};
                value.currentStatus = findPost.postStatus;
                value.updatedStatus = result.postStatus;
                value.price = price;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[100];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10215, result));
            }
            return res.json(responseError(40118));
        } catch (errors) {
            return res.json(responseError(40004, errors));
        }
    },
    upgradeUrgent: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Mua bài gấp'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(upgradePostValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { postObjId } = req.body;
            const findPost = await PostsService.findByConditions({
                postObjId,
            })
            if (isEmpty(findPost)) return res.json(responseError(40113));
            let expiredDate = findPost?.expiredDate ? findPost?.expiredDate : moment().add(1, 'months').format('YYYY-MM-DD HH:mm:ss');
            expiredDate = moment(expiredDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            const expiredUpgradePostTemp = findPost?.expiredUpgradePost;
            if (findPost?.postStatus === 'URGENT'
                && !isEmpty(expiredUpgradePostTemp)
                && moment(expiredUpgradePostTemp, 'YYYY-MM-DD HH:mm:ss').isAfter(moment()))
                return res.json(responseError(40130));
            const expiredUpgradePost = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            const findUser = await UsersService.findByConditions({
                userObjId,
            });
            const availableFund = +findUser?.availableFund;
            const configPrice = 400000;
            if (availableFund < configPrice) return res.json(responseError(40117));
            const result = await PostsService.updateStatus({
                postObjId,
                postStatus: STATUS_POST[0], // URGENT
                expiredUpgradePost,
                expiredDate,
            })
            if (!isEmpty(result)) {
                // Update account balance
                await UsersService.chargeMoney({
                    userObjId,
                    availableFund: +availableFund - configPrice,
                })
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[100];
                const value = {};
                value.currentStatus = findPost.postStatus;
                value.updatedStatus = result.postStatus;
                value.price = configPrice;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[100];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10215, result));
            }
            return res.json(responseError(40118));
        } catch (errors) {
            return res.json(responseError(40004, errors));
        }
    },
    apply: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Ứng tuyển bài đăng'
        /* #swagger.security = [{
                 "apiKeyAuth": [],
          }] */
        /* #swagger.parameters['postObjId'] = {
  in: 'body',
  description: 'id của post',
  required: true,
  type: 'string',
  } */
        /* #swagger.parameters['isReplaceCV'] = {
         in: 'body',
         description: 'Có thay thế cv không',
         required: true,
         type: 'boolean',
         } */
        /* #swagger.parameters['isUseMyCV'] = {
        in: 'body',
        description: 'Có sử dụng cv có sẵn không',
        required: true,
        type: 'boolean',
        } */
        /* #swagger.parameters['file'] = {
       in: 'body',
       description: 'File tự upload',
       required: true,
       type: 'File',
       } */
        beforeUploadAttachment(req, res, async () => {
            try {
                const errors = await validateResult(applyValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }

                const { userObjId } = req.decoded;
                const { postObjId, isReplaceCV, isUseMyCV } = req.body;
                if (isEmpty(req.file) && isEmpty(isUseMyCV))
                    return res.json(responseError(40138, []));
                const findPost = await PostsService.findByConditions({
                    postObjId,
                })
                if (isEmpty(findPost)) return res.json(responseError(40113));
                await PostsService.updateConditions({
                    postObjId,
                    allApplyUsers: +findPost?.allApplyUsers + 1,
                })
                const findUserPost = await UserPostsService.findByConditions({
                    userObjId,
                    postObjId,
                })
                if (!isEmpty(findUserPost)) return res.json(responseError(40133));
                const rs = await UserPostsService.create({
                    userObjId,
                    postObjId,
                    createdBy: userObjId,
                })
                if (req.file) {
                    const { originalname, mimetype, size } = req.file;
                    const link = urlAttachment(req);
                    const newAttachment = await AttachmentsService.create({
                        name: originalname,
                        link,
                        type: mimetype,
                        size,
                        createdBy: userObjId,
                    })
                    const newAttachmentEntity = await AttachmentEntitiesService.create({
                        attachmentObjId: newAttachment?._id,
                        entityObjId: rs.id,
                        entityType: ENTITY_TYPE_ATTACHMENTS[200],
                        createdBy: userObjId,
                        type: TYPE_UPLOAD_ATTACHMENT[200],
                    })
                    if (isReplaceCV === "true") {
                        const newCV = await AttachmentEntitiesService.create({
                            attachmentObjId: newAttachment?._id,
                            entityObjId: userObjId,
                            entityType: ENTITY_TYPE_ATTACHMENTS[100],
                            createdBy: userObjId,
                            type: TYPE_UPLOAD_ATTACHMENT[100],
                        })
                    }
                } else if (isUseMyCV === "true") {
                    const findCV = await AttachmentEntitiesService.findByConditions({
                        entityObjId: userObjId,
                        type: TYPE_UPLOAD_ATTACHMENT[100],
                    })
                    if (isEmpty(findCV)) return res.json(responseError(40139, []));
                    const newAttachmentEntity = await AttachmentEntitiesService.create({
                        attachmentObjId: findCV?.attachmentObjId?._id,
                        entityObjId: rs.id,
                        entityType: ENTITY_TYPE_ATTACHMENTS[200],
                        createdBy: userObjId,
                        type: TYPE_UPLOAD_ATTACHMENT[200],
                    })
                }
                if (!isEmpty(rs)) {
                    // Send notifications
                    const notifyParams = {
                        senderObjId: userObjId,
                        receiverObjId: findPost?.createdBy?._id,
                        notifyType: NOTIFICATION_TYPE[400],
                        relatedObjId: findPost?._id,
                        relatedType: FOR_ENTITY_TYPE[200],
                        entity: findPost,
                    }
                    return res.json(responseSuccess(10217, rs));
                }
                return res.json(responseError(40132, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    checkApply: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Check đã apply bài đăng hay chưa'
        /* #swagger.security = [{
                 "apiKeyAuth": [],
          }] */
        /* #swagger.parameters['postObjId'] = {
        in: 'query',
        description: 'id của post',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(applyValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { postObjId } = req.query;
            const findUserPost = await UserPostsService.findByConditions({
                userObjId,
                postObjId,
            })
            if (!isEmpty(findUserPost)) return res.json(responseError(40133));
            return res.json(responseSuccess(10229));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    purchaseProfile: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Mua thông tin ứng viên'
        /* #swagger.security = [{
                 "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['candidateObjId'] = {
        in: 'body',
        description: 'id của ứng viên',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(purchaseProfileValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { candidateObjId,
                //  configObjId 
            } = req.body;
            const findCandidate = await UsersService.findByConditions({
                userObjId: candidateObjId,
            })
            if (isEmpty(findCandidate)) return res.json(responseError(40122));
            const findProfileByUser = await ChargingProfilesService.findByConditions({
                recruiterObjId: userObjId,
                candidateObjId,
            });
            if (findProfileByUser) {
                return res.json(responseError(40127));
            }
            const findConfig = await ConfigsService.findByConditions({
                // configObjId,
                configCode: "CF_002"
            })
            let configMoney = 0;
            let trackingBusinessObjId = null;
            // if (findConfig?.type === CONFIG_TYPE[200]) {
            const findTrackingBusiness = await TrackingBusinessesService.findByConditions({
                userObjId,
            })
            if (isEmpty(findTrackingBusiness) && findCandidate.candidateType === CANDIDATE_TYPE[200]) return res.json(responseError(40147));
            trackingBusinessObjId = findTrackingBusiness?._id;
            const totalFreeProfiles = +findTrackingBusiness?.vipObjId?.detail?.freeProfiles;
            const purchasedChargingProfiles = await ChargingProfilesService.findByConditions({
                trackingBusinessObjId: findTrackingBusiness?._id,
                getAll: true,
            })
            const totalPurchased = +purchasedChargingProfiles?.length || 0;
            // if (totalPurchased >= totalFreeProfiles) return res.json(responseError(40156))
            // } else {
            configMoney = +findConfig?.value || 0;
            // }
            const findRecruiter = await UsersService.findByConditions({
                userObjId,
            })
            const availableFund = +findRecruiter?.availableFund;
            if (!isEmpty(findTrackingBusiness)) {
                if (totalPurchased >= totalFreeProfiles) {
                    if (availableFund < configMoney) {
                        return res.json(responseError(40117));
                    }
                } else {
                    configMoney = 0;
                }
            } else {
                if (availableFund < configMoney) {
                    return res.json(responseError(40117));
                }
            }
            const expiredTime = moment().add(1, 'day').format("YYYY-MM-DD HH:mm:ss");
            const rs = await ChargingProfilesService.create({
                recruiterObjId: userObjId,
                candidateObjId,
                createdBy: userObjId,
                expiredTime,
                trackingBusinessObjId,
            })
            if (!isEmpty(rs)) {
                // create histories
                const params = {};
                params.entityObjId = candidateObjId;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[200];
                const value = {};
                value.price = configMoney;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[400];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10232, rs));
            }
            return res.json(responseError(40126, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    extend: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng', 'Done'] 
        // #swagger.summary = 'Gia hạn bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['postObjId'] = {
       in: 'body',
       description: 'id của posts',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(postObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { postObjId } = req.body;
            const findPost = await PostsService.findByConditions({
                postObjId,
                status: STATUS[200],
            })
            if (isEmpty(findPost)) return res.json(responseError(40113));
            const createdBy = findPost?.createdBy;
            const findUser = await UsersService.findByConditions({
                userObjId: createdBy,
            })
            const availableFund = +findUser?.availableFund;
            const configPrice = findPost?.configObjId?.value || 79000;
            if (availableFund < configPrice) {
                return res.json(responseError(40135));
            }
            const expiredDate = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            result = await PostsService.updateStatus({
                postObjId: req.body.postObjId,
                status: STATUS[100],
                expiredDate,
            })
            if (!isEmpty(result)) {
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[100];
                const value = {};
                value.currentStatus = findPost.status;
                value.updatedStatus = result.status;
                value.price = configPrice;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[500];
                params.createdBy = req.decoded.userObjId;
                const his = await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10220, result));
            }
            return res.json(responseError(40136, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    inactive: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng', 'Done'] 
        // #swagger.summary = 'Hết hạn bài đăng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['postObjId'] = {
       in: 'body',
       description: 'id của posts',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(postObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { postObjId } = req.body;
            const findPost = await PostsService.findByConditions({
                postObjId,
                status: STATUS[100],
            })
            if (isEmpty(findPost)) return res.json(responseError(40113));
            const createdBy = findPost?.createdBy;
            result = await PostsService.updateStatus({
                postObjId: req.body.postObjId,
                status: STATUS[200],
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10221, result));
            }
            return res.json(responseError(40137, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    createInternal: async (req, res) => {
        // #swagger.tags = ['Công việc nội bộ'] 
        // #swagger.summary = 'Tạo mới công việc nội bộ' 
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUpload(req, res, async () => {
            try {
                const errors = await validateResult(createInternalValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                const { userObjId } = req.decoded;
                const { title, companyObjId, jobDescription,
                    jobObjId,
                    examPlace, workingTime, salary,
                    numberOfRecruits,
                    expiredDate,
                    benefit,
                    companyAddress, } = req.body;
                const expiredTime = moment().add(1, 'month').format('YYYY-MM-DD HH:mm:ss')
                if (req.file) {
                    req.body.image = urlImage(req);
                }
                const result = await PostsService.createExternal({
                    title,
                    companyObjId,
                    jobObjId,
                    jobDescription,
                    examPlace,
                    workingTime,
                    salary,
                    numberOfRecruits,
                    expiredDate,
                    benefit,
                    companyAddress,
                    expiredTime,
                    image: req.body.image,
                    createdBy: userObjId,
                });
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10501, result));
                }
                return res.json(responseError(40301, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    listInternal: async (req, res) => {
        // #swagger.tags = ['Công việc nội bộ'] 
        // #swagger.summary = 'Danh sách công việc nội bộ'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await PostsService.listInternal({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10502, result));
            }
            return res.json(responseSuccess(10502, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    updateInternal: async (req, res) => {
        // #swagger.tags = ['Công việc/ bài đăng'] 
        // #swagger.summary = 'Dashboard'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUploadUpdate(req, res, async () => {
            try {
                const errors = await validateResult(updateInternalValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.file) {
                    req.body.image = urlImage(req);
                }
                const { userObjId } = req.decoded;
                req.body.updatedBy = userObjId;
                const result = await PostsService.updateInternal(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10503, result));
                }
                return res.json(responseError(40302, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    // for pie chart + overall statistics
    statisticsDashboard: async (req, res) => {
        // #swagger.tags = ['Dash board bài đăng'] 
        // #swagger.summary = 'Dữ liệu tổng quan + pie chart'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const startDay = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            const endDay = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
            const result = {
                totalAllPosts: 0,
                totalAllPostsToday: 0,
                totalCompany: 0,
            }
            const allPosts = await PostsService.findByConditions({
                status: STATUS[100],
                getAll: true,
                selectField: true,
            })
            const allPostsToday = allPosts.filter((post) => {
                return moment(post.createdAt).isBetween(startDay, endDay, undefined, '[]');
            })
            const uniqueCompanies = [...new Set(allPosts.map(item => item.companyObjId))];
            result.totalAllPosts = allPosts?.length || 0;
            result.totalAllPostsToday = allPostsToday?.length || 0;
            result.totalCompany = uniqueCompanies?.length || 0;

            // group post by jobObjId
            const groupByJobObjId = allPosts.reduce((acc, item) => {
                const jobObjId = item.jobObjId;
                acc[jobObjId] = (acc[jobObjId] || 0) + 1;
                return acc;
            }, {});

            const formatGroup = Object.entries(groupByJobObjId).map(([jobObjId, count]) => ({
                jobObjId,
                count: Number((+count / +allPosts.length * 100).toFixed(2))
            }))
                .sort((a, b) => b.count - a.count);
            const topFiveJob = formatGroup.slice(0, 5);
            const countOtherJob = formatGroup.slice(5).reduce((total, { count }) => total + +count, 0);
            topFiveJob.push({
                "jobObjId": "Others",
                "count": +countOtherJob.toFixed(2)
            })
            if (!isEmpty(allPosts)) {
                return res.json(responseSuccess(10227, {
                    pieChart: {
                        'jobs': topFiveJob.map((item) => item.jobObjId),
                        'counts': topFiveJob.map((item) => item.count),
                    }, statistics: result
                }));
            }
            return res.json(responseSuccess(10227, result));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    // TOP HR
    topHR: async (req, res) => {
        // #swagger.tags = ['Dash board bài đăng'] 
        // #swagger.summary = 'Top nhà tuyển dụng'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {

            const allPosts = await PostsService.topHR({
            })
            return res.json(responseSuccess(10228, allPosts));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    // uploadTest: async (req, res) => {
    //     beforeUpload(req, res, async () => {
    //         try {
    //             const result = urlFromFilename(req);
    //             return res.json(result);
    //         } catch (errors) {
    //             return res.json(responseError(40004, errors));
    //         }
    //     })
    // }
}
