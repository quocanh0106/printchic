require('dotenv').config()
const NotificationsService = require('../services/NotificationsService');
const moment = require('moment-timezone');
const {
  responseError,
  validateResult,
  isEmpty,
  responseSuccess,
  urlImage,
  urlAttachment,
} = require('../utils/shared');
const { upload } = require('../configs/configMulter');
const { ENTITY_TYPE_ATTACHMENTS, TYPE_UPLOAD_ATTACHMENT, ENTITY_TYPE_CHARGING_HISTORIES, TYPE_CHARGING_HISTORIES } = require('../utils/constants');
const { notificationObjIdValidator } = require('../validators/NotificationsValidator');

const beforeUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (isEmpty(req.file)) return res.json(responseError(40183))
    return next();
  });
};
module.exports.AUTH = {

  create: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Test tạo noti'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const { userObjId } = req.decoded;
      const {
        senderObjId,
        receiverObjId,
        notifyType,
        notifyTitle,
        notifyContent,
        relatedObjId,
        relatedType } = req.body;
      const result = await NotificationsService.create({
        senderObjId,
        receiverObjId,
        notifyType,
        notifyTitle,
        notifyContent,
        relatedObjId,
        relatedType,
        createdBy: userObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10424, result));
      }
      return res.json(responseError(40234));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  list: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Danh sách thông báo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const { userObjId } = req.decoded;
      const result = await NotificationsService.list({
        ...req.query,
        receiverObjId: userObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10421, result));
      }
      return res.json(responseSuccess(10421, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  read: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Xem 1 thông báo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const errors = await validateResult(notificationObjIdValidator, req);
      if (!isEmpty(errors)) {
        return res.json(responseError(40004, errors));
      }
      const { userObjId } = req.decoded;
      const { notificationObjId } = req.body;
      const result = await NotificationsService.read({
        receiverObjId: userObjId,
        updatedBy: userObjId,
        notificationObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10422, result));
      }
      return res.json(responseSuccess(40232, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  readAll: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Xem tất cả thông báo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const { userObjId } = req.decoded;
      const result = await NotificationsService.readAll({
        receiverObjId: userObjId,
        updatedBy: userObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10422, result));
      }
      return res.json(responseSuccess(40232, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  detail: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Chi tiết thông báo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const errors = await validateResult(notificationObjIdValidator, req);
      if (!isEmpty(errors)) {
        return res.json(responseError(40004, errors));
      }
      const { userObjId } = req.decoded;
      const result = await NotificationsService.findByConditions({
        receiverObjId: userObjId,
        notificationObjId,
      })
      if (!isEmpty(result)) {
        const result = await NotificationsService.read({
          receiverObjId: userObjId,
          updatedBy: userObjId,
          notificationObjId,
        })
        return res.json(responseSuccess(10425, result));
      }
      return res.json(responseSuccess(40234, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  total: async (req, res) => {
    // #swagger.tags = ['Notifications'] 
    // #swagger.summary = 'Tổng số thông báo chưa đọc'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const errors = await validateResult(notificationObjIdValidator, req);
      if (!isEmpty(errors)) {
        return res.json(responseError(40004, errors));
      }
      const { userObjId } = req.decoded;
      const result = await NotificationsService.total({
        receiverObjId: userObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10426, result));
      }
      return res.json(responseSuccess(10426, 0));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
};
