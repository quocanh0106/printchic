require('dotenv').config()
const AdvertisementsService = require('../services/AdvertisementsService');
const ConfigsService = require('../services/ConfigsService');
const AttachmentsService = require('../services/AttachmentsService');
const AttachmentEntitiesService = require('../services/AttachmentEntitiesService');
const ChargingHistoriesService = require('../services/ChargingHistoriesService');
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
const { createValidator, advertisementObjId: advertisementObjIdValidator, updateValidator } = require('../validators/AdvertisementsValidator');

const beforeUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (isEmpty(req.file)) return res.json(responseError(40183))
    return next();
  });
};
module.exports.AUTH = {

  create: async (req, res) => {
    // #swagger.tags = ['Landing'] 
    // #swagger.summary = 'Tạo mới quảng cáo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    beforeUpload(req, res, async () => {
      try {
        const errors = await validateResult(createValidator, req);
        if (!isEmpty(errors)) {
          return res.json(responseError(40004, errors));
        }
        const { userObjId } = req.decoded;
        const { position, configObjId, revenue,
          advertisementName, url,
          startDate, endDate } = req.body;
        const findAdvertisement = await AdvertisementsService.findByConditions({
          position,
        })
        const findConfig = await ConfigsService.findByConditions({
          position,
          getAll: true,
        })
        const configIds = findConfig.reduce((prev, curr) => prev.concat(curr.id), [])
          .map((item) => String(item));
        if (!configIds.includes(configObjId)) return res.json(responseError(40184));
        if (!isEmpty(findAdvertisement)) return res.json(responseError(40182));
        const result = await AdvertisementsService.create({
          position,
          configObjId,
          revenue,
          advertisementName,
          url,
          startDate,
          endDate,
          createdBy: userObjId,
        })
        if (!isEmpty(result)) {
          if (req.file) {
            const { originalname, mimetype, size } = req.file;
            const link = urlImage(req);
            const newAttachment = await AttachmentsService.create({
              name: originalname,
              link,
              type: mimetype,
              size,
              createdBy: userObjId,
            })
            const newAttachmentEntity = await AttachmentEntitiesService.create({
              attachmentObjId: newAttachment?._id,
              entityObjId: result.id,
              entityType: ENTITY_TYPE_ATTACHMENTS[300],
              createdBy: userObjId,
              type: TYPE_UPLOAD_ATTACHMENT[300],
            })
          }
          // create histories
          const params = {};
          params.entityObjId = result?._id;
          params.entityType = ENTITY_TYPE_CHARGING_HISTORIES[300];
          const value = {};
          value.price = revenue;
          params.value = value;
          params.type = TYPE_CHARGING_HISTORIES[600];
          params.createdBy = userObjId;
          await ChargingHistoriesService.create(params)
          return res.json(responseSuccess(10281, result));
        }
        return res.json(responseError(40181));
      } catch (errors) {
        console.log(errors, 'errors')
        return res.json(responseError(40004, errors));
      }
    })
  },
  list: async (req, res) => {
    // #swagger.tags = ['Landing'] 
    // #swagger.summary = 'Danh sách quảng cáo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const result = await AdvertisementsService.list({
        ...req.query,
      })
      for (let i = 0; i < result?.items?.length; i++) {
        const findAttachmentEntity = await AttachmentEntitiesService.findByConditions({
          entityObjId: result.items[i]._id,
        })
        result.items[i].image = findAttachmentEntity?.attachmentObjId?.link;
      }
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10213, result));
      }
      return res.json(responseSuccess(10213, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  delete: async (req, res) => {
    // #swagger.tags = ['Landing'] 
    // #swagger.summary = 'Xóa quảng cáo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const errors = await validateResult(advertisementObjIdValidator, req);
      if (!isEmpty(errors)) {
        return res.json(responseError(40004, errors));
      }
      const { advertisementObjId } = req.body;
      const result = await AdvertisementsService.updateDelete({
        advertisementObjId,
      })
      if (!isEmpty(result)) {
        return res.json(responseSuccess(10283, result));
      }
      return res.json(responseSuccess(40185, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
  update: async (req, res) => {
    // #swagger.tags = ['Landing'] 
    // #swagger.summary = 'Update quảng cáo'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    beforeUpload(req, res, async () => {
      try {
        const errors = await validateResult(updateValidator, req);
        if (!isEmpty(errors)) {
          return res.json(responseError(40004, errors));
        }
        const { userObjId } = req.decoded;
        const { advertisementObjId, advertisementName, url } = req.body;
        const result = await AdvertisementsService.update({
          advertisementObjId,
          updatedBy: userObjId,
          advertisementName,
          url,
        })
        if (!isEmpty(result)) {
          if (req.file) {
            const { originalname, mimetype, size } = req.file;
            const link = urlImage(req);
            const newAttachment = await AttachmentsService.create({
              name: originalname,
              link,
              type: mimetype,
              size,
              createdBy: userObjId,
            })
            const newAttachmentEntity = await AttachmentEntitiesService.create({
              attachmentObjId: newAttachment?._id,
              entityObjId: result.id,
              entityType: ENTITY_TYPE_ATTACHMENTS[300],
              createdBy: userObjId,
              type: TYPE_UPLOAD_ATTACHMENT[300],
            })
          }
          return res.json(responseSuccess(10284, result));
        }
        return res.json(responseSuccess(40186, []));
      } catch (errors) {
        console.log(errors, 'errors')
        return res.json(responseError(40004, errors));
      }
    })
  },
};
module.exports.DEFAULT = {
  landing: async (req, res) => {
    // #swagger.tags = ['Landing'] 
    // #swagger.summary = 'Landing'
    /* #swagger.security = [{
           "apiKeyAuth": [],
    }] */
    try {
      const result = await AdvertisementsService.findByConditions({
        getAll: true,
      })
      if (!isEmpty(result)) {
        for (let i = 0; i < result.length; i++) {
          const findAttachmentEntity = await AttachmentEntitiesService.findByConditions({
            entityObjId: result[i]._id,
          })
          result[i].image = findAttachmentEntity?.attachmentObjId?.link;
        }
        return res.json(responseSuccess(10282, result));
      }
      return res.json(responseSuccess(10282, []));
    } catch (errors) {
      console.log(errors, 'errors')
      return res.json(responseError(40004, errors));
    }
  },
}