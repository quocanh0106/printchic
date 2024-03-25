require('dotenv').config()
const UsersService = require('../services/UsersService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configJwt = require('../configs/configJWT');
const moment = require('moment-timezone');
const { STATUS_USER, ENTITY_TYPE_CHARGING_HISTORIES, TYPE_CHARGING_HISTORIES,
    STATUS, ENTITY_TYPE_ATTACHMENTS, TYPE_UPLOAD_ATTACHMENT, CONFIG_TYPE, CANDIDATE_TYPE,
    CANDIDATE_GROUP, TYPE_USER } = require('../utils/constants')
const { CODES_SUCCESS } = require('../utils/messages')
const {
    responseError,
    validateResult,
    isEmpty,
    sendMail,
    generateRandomString,
    responseSuccess,
    urlImage,
    urlAttachment,
    generatorTime,
    generateExpiredTime,
} = require('../utils/shared');
const { upload, uploadAttachment } = require('../configs/configMulter');

const { registerValidator, loginValidator, verifyValidator, forgotValidator, resetPWValidator,
    updateValidator, chargingValidator, upgradeValidator, userObjIdValidator,
    changePasswordValidator,
    changePasswordUserValidator,
    trackingBusinessObjIdValidator } = require('../validators/UsersValidator');
const checkValid = async (data) => {
    try {
        const email = data.email;
        const findUser = await UsersService.findByConditions({
            email,
            isRegister: true
        });
        if (!isEmpty(findUser)) return 40107;
        return '';
    } catch (errors) {
        
        return 40004;
    }
}

const beforeUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (isEmpty(req.file)) return next();
        return next();
    });
};

const beforeUploadAttachment = (req, res, next) => {
    uploadAttachment(req, res, (err) => {
        if (!isEmpty(err)) {
            return res.json(responseError(err));
        }
        if (isEmpty(req.file)) {
            return res.json(responseError(40145));
        }
        return next();
    });
};


const canAllowView = async (data) => {
    try {
        const { userObjId, candidateObjId } = data;
        const findChargingProfile = await ChargingProfilesService.findByConditions({
            recruiterObjId: userObjId,
            candidateObjId,
        })
        // return 40129;
        if (isEmpty(findChargingProfile)) return false;
        const expiredTime = findChargingProfile.expiredTime;
        // return 40140;
        if (moment(expiredTime, 'YYYY-MM-DD HH:mm:ss').isBefore(moment())) return false;
        return true;
    } catch (errors) {
        return false;
        // return 40004;
    }
}
module.exports.DEFAULT = {
    register: async (req, res) => {
        // #swagger.tags = ['Auth'] 
        // #swagger.summary = 'Đăng ký'
        try {
            const errors = await validateResult(registerValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const { password, email, name } = req.body;
            const resultCheck = await checkValid({
                email,
                isRegister: true,
            })
            if (!isEmpty(resultCheck)) return res.json(responseError(resultCheck));
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UsersService.create({
                email,
                password: hashedPassword,
                name,
            })
            const accessToken = jwt.sign({
                email: email,
                userObjId: result._id,
            },
                configJwt.secret,
                // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            const paramsExpires = {};
            paramsExpires.userObjId = result._id;
            delete result._doc.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10000,
                message: CODES_SUCCESS[10000],
                data: result,
            });
        } catch (err) {
            
            return res.json(err);
        }
    },
    login: async (req, res) => {
        // #swagger.tags = ['Auth'] 
        // #swagger.summary = 'Đăng nhập'
        try {
            const errors = await validateResult(loginValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const { email, password } = req.body;
            // Check for existing user
            const user = await UsersService.findByConditions({
                email,
            })
            if (user?.status === STATUS[200]) return res.json(responseError(40134, errors));
            if (!user) return res.json(responseError(40106, errors));
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.json(responseError(40106, errors));
            // clear verify code
            await UsersService.updateConditions({
                email,
            })
            // Return token
            const accessToken = jwt.sign({
                email: user.email,
                userObjId: user._id
            },
                configJwt.secret,
                // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            // const expiresDate = moment(decoded.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            // const paramsExpires = {};
            // paramsExpires.userObjId = user._id;
            // paramsExpires.expiresDate = expiresDate;
            // await UsersService.updateExpiresDate(paramsExpires);
            delete user.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10001,
                message: CODES_SUCCESS[10001],
                data: user,
            });
        } catch (err) {
            
            return res.json(err);
        }
    },

}
module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Danh nhà tuyển dụng / ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['type'] = {
         in: 'query',
         description: 'Loại user. CANDIDATE: ứng viên | HR: nhà tuyển dụng',
         required: true,
         type: 'string',
         } */
        /* #swagger.parameters['search'] = {
        in: 'query',
        description: 'search theo tên, điện thoại, email, fb, zalo',
        required: false,
        type: 'string',
        } */
        try {
            const result = await UsersService.list({
                ...req.query,
                candidateGroup: CANDIDATE_GROUP[100],
            })
            if (!isEmpty(result)) {
                for (let i = 0; i < result.items.length; i++) {
                    let isPurchased = false;
                    if (req?.decoded?.userObjId) {
                        isPurchased = await canAllowView({
                            candidateObjId: result.items[i]._id,
                            userObjId: req.decoded.userObjId,
                        })
                    }
                    result.items[i].isPurchased = isPurchased;
                }
                return res.json(responseSuccess(10204, result));
            }
            return res.json(responseSuccess(10204, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    info: async (req, res) => {
        // #swagger.tags = ['User'] 
        // #swagger.summary = 'Chi tiết nhà tuyển dụng / ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
        in: 'query',
        description: 'id của user',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(userObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.query;
            const findUser = await UsersService.findByConditions({
                userObjId,
            });
            if (!isEmpty(findUser)) {
                let isPurchased = false;
                if (!isEmpty(req?.decoded?.userObjId)) {
                    isPurchased = await canAllowView({
                        candidateObjId: userObjId,
                        userObjId: req.decoded.userObjId,
                    })
                }
                findUser.isPurchased = isPurchased;
                const findCV = await AttachmentEntitiesService.findByConditions({
                    entityObjId: findUser?._id,
                    type: TYPE_UPLOAD_ATTACHMENT[100],
                })
                findUser.CV = findCV ? findCV : null;
                delete findUser.password;
                if (isEmpty(req?.decoded?.userObjId)
                    || (!isPurchased && String(req?.decoded?.userObjId) !== String(findUser?._id))) {
                    if (findUser?.type !== TYPE_USER[0]) {
                        delete findUser.phoneNumber;
                        delete findUser.password;
                        delete findUser.email;
                        delete findUser.fb;
                        delete findUser.zalo;
                    }
                }
                return res.json(responseSuccess(10205, findUser));
            }
            return res.json(responseError(40122));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    detailVIP: async (req, res) => {
        // #swagger.tags = ['User'] 
        // #swagger.summary = 'Chi tiết VIP'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['trackingBusinessObjId'] = {
        in: 'query',
        description: 'id của tracking',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(trackingBusinessObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { trackingBusinessObjId } = req.query;
            const result = await TrackingBusinessesService.findByConditions({
                trackingBusinessObjId,
            });
            if (!isEmpty(result)) {
                const findUsedPost = await PostsService.findByConditions({
                    trackingBusinessObjId,
                })
                const findUsedProfile = await PostsService.findByConditions({
                    trackingBusinessObjId,
                })
                result.usedPost = findUsedPost?.length || 0;
                result.usedProfile = findUsedProfile?.length || 0;
                return res.json(responseSuccess(10242, result));
            }
            return res.json(responseError(40152));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['User'] 
        // #swagger.summary = 'Cập nhật nhà tuyển dụng / ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUpload(req, res, async () => {
            try {
                const errors = await validateResult(updateValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.file) {
                    req.body.avatar = urlImage(req);
                }
                const result = await UsersService.updateConditions(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10203, result));
                }
                return res.json(responseError(40109, []));
            } catch (errors) {
                
                return res.json(responseError(40004, errors));
            }
        })
    },
    chargeMoney: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Nạp tiền cho nhà tuyển dụng / ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
        in: 'query',
        description: 'id của user',
        required: true,
        type: 'string',
        } */
        /* #swagger.parameters['chargingMoney'] = {
        in: 'query',
        description: 'Số tiền cần nạp',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(chargingValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const result = await UsersService.chargeMoney({
                userObjId: req.body.userObjId,
                availableFund: +findUser?.availableFund + +req.body.chargingMoney,
                updatedBy: userObjId,
            })
            delete result.password;
            if (!isEmpty(result)) {
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[200];
                const value = {};
                value.price = +req.body.chargingMoney;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[300];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10230, result));
            }
            return res.json(responseError(40121, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    upgradeUser: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Tích xanh cho nhà tuyển dụng / ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['vipObjId'] = {
       in: 'query',
       description: 'id của vip',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(upgradeValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { vipObjId, price } = req.body;
            const paidMoney = +price;
            const findUser = await UsersService.findByConditions({
                userObjId,
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const findConfig = await ConfigsService.findByConditions({
                configObjId: vipObjId,
                type: CONFIG_TYPE[200]
            })
            if (isEmpty(findConfig)) return res.json(responseError(40152))
            const findTracking = await TrackingBusinessesService.findByConditions({
                userObjId,
            });
            // let paidMoney = 0
            if (!isEmpty(findTracking)) {
                const currentLevel = +findTracking?.vipObjId?.level;
                const upgradeLevel = +findConfig?.level;
                if (currentLevel <= upgradeLevel) return res.json(responseError(40153));
                // const currentPriceConfig = +findTracking?.vipObjId?.value;
                // const upgradePriceConfig = +findConfig?.value;
                // // giá tiền chênh lệch
                // const diffPrice = +upgradePriceConfig - +currentPriceConfig >= 0 ? upgradePriceConfig - currentPriceConfig : 0
                // const postsPackage = +findTracking?.vipObjId?.detail?.expiredPost;
                // const findUsedPost = await PostsService.findByConditions({
                //     trackingBusinessObjId: findTracking?._id,
                //     getAll: true,
                // })
                // const totalUsedPost = findUsedPost?.length || 0;
                // // số tiền đã sử dụng
                // const usedPrice = (currentPriceConfig / postsPackage) * totalUsedPost;
                // paidMoney = diffPrice + usedPrice;
            } else {
                // paidMoney = findConfig?.value;
            }
            const availableFund = +findUser?.availableFund;
            if (availableFund < paidMoney) return res.json(responseError(40117))
            const deleteCurrentTracking = await TrackingBusinessesService.updateDelete({
                trackingBusinessObjId: findTracking?._id,
            })
            const expiredTimeConfig = generateExpiredTime(findConfig?.expired?.value, findConfig?.expired?.unit);
            const newTracking = await TrackingBusinessesService.create({
                userObjId,
                vipObjId,
                expiredTime: expiredTimeConfig,
            });
            const result = await UsersService.chargeMoney({
                userObjId,
                availableFund: +availableFund - +paidMoney,
                statusUser: STATUS_USER[0],
                expireTruth: expiredTimeConfig,
                updatedBy: userObjId,
                trackingBusinessObjId: newTracking?._id,
            })
            // delete result.password;
            if (!isEmpty(result)) {
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[200];
                const value = {};
                value.price = +paidMoney;
                value.currentStatus = findUser?.statusUser;
                value.updatedStatus = result?.statusUser;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[200];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10231, result));
            }
            return res.json(responseError(40123, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    changePassword: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Change password'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['password'] = {
        in: 'body',
        description: 'mật khẩu mới',
        required: true,
        type: 'string',
       } */
        try {
            const errors = await validateResult(changePasswordValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UsersService.updateConditions({
                password: hashedPassword,
                userObjId,
            });
            delete result.password;
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10233, result));
            }
            return res.json(responseError(40141, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    lock: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Khóa tài khoản'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
       in: 'body',
       description: 'id của user',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(userObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const updatedBy = req.decoded.userObjId;
            const { userObjId } = req.body;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
                status: STATUS[100],
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const result = await UsersService.updateStatus({
                userObjId,
                status: STATUS[200],
                updatedBy,
            })
            delete result.password;
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10234, result));
            }
            return res.json(responseError(40142, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    unlock: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Mở khóa tài khoản'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
       in: 'body',
       description: 'id của user',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(userObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const updatedBy = req.decoded.userObjId;
            const { userObjId } = req.body;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
                status: STATUS[200],
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const result = await UsersService.updateStatus({
                userObjId,
                status: STATUS[100],
                updatedBy,
            })
            delete result.password;
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10235, result));
            }
            return res.json(responseError(40142, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    changePassOtp: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Gửi otp thay đổi mật khẩu ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId,
                status: STATUS[100],
            })
            if (isEmpty(findUser)) return res.json(responseError(40100));
            const otp = generateRandomString();
            const result = await UsersService.updateConditions({
                userObjId,
                changePWCode: otp,
            })
            if (!isEmpty(result)) {
                delete result.changePWCode;
                const content = `Your verify code: ${otp}`;
                await sendMail(findUser?.email, 'XKLD', content);
                return res.json(responseSuccess(10200, result));
            }
            return res.json(responseError(40102));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    verifyOtpChange: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Verify otp change password'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['otp'] = {
      in: 'body',
      description: 'otp code',
      required: true,
      type: 'string',
      } */
        try {
            const { otp } = req.body;
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId,
                status: STATUS[100],
            })
            if (isEmpty(findUser)) return res.json(responseError(40100));
            if (findUser?.changePWCode !== otp) return res.json(responseError(40104));
            // clear verify code
            await UsersService.updateConditions({
                userObjId: findUser?._id,
                changePWCode: "",
            })
            return res.json(responseSuccess(10202));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    changePasswordUser: async (req, res) => {
        // #swagger.tags = ['User', 'Done'] 
        // #swagger.summary = 'Change password'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['password'] = {
        in: 'body',
        description: 'mật khẩu mới',
        required: true,
        type: 'string',
       } */
        /* #swagger.parameters['currentPW'] = {
        in: 'body',
        description: 'mật khẩu hiện tại',
        required: true,
        type: 'string',
       } */
        try {
            const errors = await validateResult(changePasswordUserValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const { password, currentPW } = req.body;
            const validCurrPassword = await bcrypt.compare(currentPW, findUser.password);
            if (!validCurrPassword) return res.json(responseError(40143, errors));
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UsersService.updateConditions({
                password: hashedPassword,
                userObjId,
                lastModifiedPW: generatorTime(),
            });
            delete result.password;
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10233, result));
            }
            return res.json(responseError(40141, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    uploadCV: async (req, res) => {
        // #swagger.tags = ['User','Done'] 
        // #swagger.summary = 'Upload cv'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['file'] = {
       in: 'body',
       description: 'file or cv',
       required: true,
       type: 'string',
      } */
        beforeUploadAttachment(req, res, async () => {
            try {
                const { userObjId } = req.decoded;
                const { originalname, mimetype, size } = req.file;
                const link = urlAttachment(req);
                // delete many
                await AttachmentEntitiesService.updateMany({
                    entityObjId: userObjId,
                })
                const newAttachment = await AttachmentsService.create({
                    name: originalname,
                    link,
                    type: mimetype,
                    size,
                    createdBy: userObjId,
                })
                const newAttachmentEntity = await AttachmentEntitiesService.create({
                    attachmentObjId: newAttachment?._id,
                    entityObjId: userObjId,
                    entityType: ENTITY_TYPE_ATTACHMENTS[100],
                    createdBy: userObjId,
                    type: TYPE_UPLOAD_ATTACHMENT[100],
                })
                if (!isEmpty(newAttachment) && !isEmpty(newAttachmentEntity)) {
                    return res.json(responseSuccess(10236, newAttachment));
                }
                return res.json(responseError(40146, []));
            } catch (errors) {
                
                return res.json(responseError(40004, errors));
            }
        })
    },
    deleteCV: async (req, res) => {
        // #swagger.tags = ['User','Done'] 
        // #swagger.summary = 'Upload cv'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['file'] = {
       in: 'body',
       description: 'file or cv',
       required: true,
       type: 'string',
      } */
        try {
            const { userObjId } = req.decoded;
            // delete many
            const result = await AttachmentEntitiesService.updateMany({
                entityObjId: userObjId,
            })
            return res.json(responseSuccess(10237, result));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    upgradeCandidate: async (req, res) => {
        // #swagger.tags = ['User'] 
        // #swagger.summary = 'Nâng cấp lao động'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
        in: 'query',
        description: 'id của user',
        required: true,
        type: 'string',
        } */
        try {
            const errors = await validateResult(userObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const findUser = await UsersService.findByConditions({
                userObjId: req.body.userObjId,
            })
            if (isEmpty(findUser)) return res.json(responseError(40122))
            const findConfig = await ConfigsService.findByConditions({
                configCode: "PRO_CANDIDATE"
            })
            const paidMoney = findConfig?.value || 50000;
            if (+findUser?.availableFund < paidMoney) {
                return res.json(responseError(`You have at least ${paidMoney} to upgrade`))
            }
            const result = await UsersService.chargeMoney({
                userObjId,
                availableFund: +findUser?.availableFund - +paidMoney,
                updatedBy: userObjId,
                candidateType: CANDIDATE_TYPE[200]
            })
            delete result.password;
            if (!isEmpty(result)) {
                // create histories
                const params = {};
                params.entityObjId = result?._id;
                params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[200];
                const value = {};
                value.price = +paidMoney;
                params.value = value;
                params.type = TYPE_CHARGING_HISTORIES[700];
                params.createdBy = userObjId;
                await ChargingHistoriesService.create(params)
                return res.json(responseSuccess(10601, result));
            }
            return res.json(responseError(40331, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    createExternal: async (req, res) => {
        // #swagger.tags = ['Ứng viên ngoài sàn'] 
        // #swagger.summary = 'Tạo ứng viên ngoài sàn'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUpload(req, res, async () => {
            try {
                // const errors = await validateResult(updateValidator, req);
                // if (!isEmpty(errors)) {
                //     return res.json(responseError(40004, errors));
                // }
                if (req.file) {
                    req.body.avatar = urlImage(req);
                }
                const result = await UsersService.createInternal(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10601, result));
                }
                return res.json(responseError(40351, []));
            } catch (errors) {
                
                return res.json(responseError(40004, errors));
            }
        })
    },
    listInternal: async (req, res) => {
        // #swagger.tags = ['Ứng viên ngoài sàn'] 
        // #swagger.summary = 'Danh sách ứng viên ngoài sàn'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['search'] = {
        in: 'query',
        description: 'search theo tên, điện thoại, email, fb, zalo',
        required: false,
        type: 'string',
        } */
        try {
            const result = await UsersService.list({
                search: req?.query?.search,
                candidateGroup: CANDIDATE_GROUP[200],
                type: TYPE_USER[1]
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10602, result));
            }
            return res.json(responseSuccess(10602, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
    updateExternal: async (req, res) => {
        // #swagger.tags = ['Ứng viên ngoài sàn'] 
        // #swagger.summary = 'Update ứng viên ngoài sàn'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUpload(req, res, async () => {
            try {
                const errors = await validateResult(userObjIdValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                if (req.file) {
                    req.body.avatar = urlImage(req);
                }
                const result = await UsersService.updateInternal(req.body)
                if (!isEmpty(result)) {
                    return res.json(responseSuccess(10603, result));
                }
                return res.json(responseError(40352, []));
            } catch (errors) {
                
                return res.json(responseError(40004, errors));
            }
        })
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Ứng viên ngoài sàn'] 
        // #swagger.summary = 'Xóa ứng viên'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['userObjId'] = {
       in: 'body',
       description: 'id của user',
       required: true,
       type: 'string',
       } */
        try {
            const errors = await validateResult(userObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const result = await UsersService.softDelete({
                userObjId: req.body.userObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10604, result));
            }
            return res.json(responseError(40353, []));
        } catch (errors) {
            
            return res.json(responseError(40004, errors));
        }
    },
}