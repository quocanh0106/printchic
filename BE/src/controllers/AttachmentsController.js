require('dotenv').config()
const ConfigsService = require('../services/ConfigsService');
const TrackingBusinessesService = require('../services/TrackingBusinessesService');
const AttachmentsService = require('../services/AttachmentsService');
const AttachmentEntitiesService = require('../services/AttachmentEntitiesService');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
    urlAttachment,
} = require('../utils/shared');
const {
    TYPE_UPLOAD_ATTACHMENT, ENTITY_TYPE_ATTACHMENTS
} = require('../utils/constants');
const { uploadAttachment } = require('../configs/configMulter');
const { deleteTemplateCVValidator } = require('../validators/AttachmentsValidator');
const beforeUploadAttachment = (req, res, next) => {
    uploadAttachment(req, res, (err) => {
        if (!isEmpty(err)) {
            return res.json(responseError(err));
        }
        if (isEmpty(req.file)) res.json(responseError(40271));
        return next();
    });
};
module.exports.AUTH = {

    createTemplateCV: async (req, res) => {
        // #swagger.tags = ['Template CV'] 
        // #swagger.summary = 'Tạo template CV'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUploadAttachment(req, res, async () => {
            try {
                const { userObjId } = req.decoded;
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
                    entityObjId: userObjId,
                    entityType: ENTITY_TYPE_ATTACHMENTS[100],
                    createdBy: userObjId,
                    type: TYPE_UPLOAD_ATTACHMENT[400],
                })
                if (!isEmpty(newAttachmentEntity)) {
                    return res.json(responseSuccess(10471, newAttachmentEntity));
                }
                return res.json(responseSuccess(40272, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Template CV'] 
        // #swagger.summary = 'Xóa template CV'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(deleteTemplateCVValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { attachmentObjId } = req.body;
            const findAttachmentEntity = await AttachmentEntitiesService.findByConditions({
                attachmentObjId,
            })
            if (isEmpty(findAttachmentEntity)) return res.json(responseError(40274, []));
            const result = await AttachmentsService.updateDelete({
                attachmentObjId,
            })
            await AttachmentEntitiesService.updateDelete({
                attachmentObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10472, result));
            }
            return res.json(responseError(40273, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listTemplateCV: async (req, res) => {
        // #swagger.tags = ['Template CV'] 
        // #swagger.summary = 'Danh sách template cv'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await AttachmentEntitiesService.findByConditions({
                type: TYPE_UPLOAD_ATTACHMENT[400],
                getAll: true,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10473, result));
            }
            return res.json(responseSuccess(10473, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },

}
