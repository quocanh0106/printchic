const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const { POSITION_ADVERTISEMENTS, CONFIG_TYPE } = require('../utils/constants');
const POSITION_ADVERTISEMENTS_ENUM = Object.values(POSITION_ADVERTISEMENTS);
const CONFIG_TYPE_ENUM = Object.values(CONFIG_TYPE);
const mongoosePaginate = require('mongoose-paginate-v2');

const advertisementsBase = {
  position: { type: String, enum: POSITION_ADVERTISEMENTS_ENUM, default: POSITION_ADVERTISEMENTS[100], required: true }, // vị trí
  configObjId: { type: ObjectId, ref: 'configs', required: true }, // gói
  revenue: { type: Number },
  advertisementName: { type: String }, // tên quảng cáo
  url: { type: String }, // tên quảng cáo
  startDate: { type: String },
  endDate: { type: String },
}


const advertisements = { ...advertisementsBase, ...common };
const AdvertisementSchema = new Schema(advertisements, { versionKey: false });
AdvertisementSchema.index({
  position: 1, isDeleted: 1,
}, {
  unique: true,
  partialFilterExpression: {
    isDeleted: { $eq: 'No' },
  },
});
AdvertisementSchema.plugin(mongoosePaginate);
const AdvertisementsModels = mongoose.model('advertisements', AdvertisementSchema);

module.exports = AdvertisementsModels;