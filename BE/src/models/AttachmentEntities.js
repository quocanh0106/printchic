const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const { ENTITY_TYPE_ATTACHMENTS = {}, TYPE_UPLOAD_ATTACHMENT = {} } = require('../utils/constants');
const ENTITY_TYPE_ATTACHMENTS_ENUM = Object.values(ENTITY_TYPE_ATTACHMENTS);
const TYPE_UPLOAD_ATTACHMENT_ENUM = Object.values(TYPE_UPLOAD_ATTACHMENT);
const attachmentEntitiesBase = {
    attachmentObjId: {
        type: ObjectId, required: true, trim: true, sparse: true, ref: 'attachments',
    },
    entityObjId: { type: ObjectId, trim: true, default: null },
    entityType: {
        type: String, enum: ENTITY_TYPE_ATTACHMENTS_ENUM, default: ENTITY_TYPE_ATTACHMENTS_ENUM[100], trim: true,
    },
    type: {
        type: String, enum: TYPE_UPLOAD_ATTACHMENT_ENUM, default: TYPE_UPLOAD_ATTACHMENT[100], trim: true,
    }
}
const attachmentEntities = { ...attachmentEntitiesBase, ...common };
const AttachmentEntitiesSchema = new Schema(attachmentEntities, { versionKey: false });
AttachmentEntitiesSchema.index({
    attachmentObjId: 1, entityObjId: 1, entityType: 1, isDeleted: 1,
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: 'No' },
    },
});
const AttachmentEntitiesModels = mongoose.model('attachment_entities', AttachmentEntitiesSchema);
module.exports = AttachmentEntitiesModels;