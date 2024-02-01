
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const { common } = require('./Common');
const { NOTIFICATION_TYPE, YES_NO, FOR_ENTITY_TYPE } = require('../utils/constants');
const YES_NO_ENUM = Object.values(YES_NO);
const NOTIFICATION_TYPE_ENUM = Object.values(NOTIFICATION_TYPE);
const FOR_ENTITY_TYPE_ENUM = Object.values(FOR_ENTITY_TYPE);
const base = {
    senderObjId: {
        type: ObjectId, required: true, trim: true, sparse: true, ref: 'users',
    }, // nguời gửi
    receiverObjId: {
        type: ObjectId, required: true, trim: true, sparse: true, ref: 'users',
    }, // nguời nhận
    isRead: { type: String, default: 'No', enum: YES_NO_ENUM },
    notifyType: { type: String, required: true, enum: NOTIFICATION_TYPE_ENUM }, // loại thông báo
    notifyTitle: { type: String }, // tiêu đề thông báo
    notifyContent: { type: String }, // nội dung thông báo
    image: { type: String }, // hình ảnh thông báo
    relatedObjId: {
        type: ObjectId, required: true, sparse: true, trim: true,
    },
    relatedType: {
        type: String, required: true, trim: true, enum: FOR_ENTITY_TYPE_ENUM, default: FOR_ENTITY_TYPE[100],
    },
    notifyData: {
    },
};

const baseParams = { ...base, ...common };

const notificationSchema = new Schema(baseParams, { versionKey: false });
notificationSchema.plugin(mongoosePaginate);
const NotificationsModel = mongoose.model('notifications', notificationSchema);
module.exports = NotificationsModel;
