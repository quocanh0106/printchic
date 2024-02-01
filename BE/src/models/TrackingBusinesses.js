const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');

const TrackingBusinessesBase = {
  vipObjId: {
    type: ObjectId, default: null, require: true, ref: 'configs',
  },
  userObjId: {
    type: ObjectId, default: null, require: true, ref: 'users',
  },
  expiredTime: {
    type: String,
  }
}
const TrackingBusinesses = { ...TrackingBusinessesBase, ...common };
const TrackingBusinessesSchema = new Schema(TrackingBusinesses, { versionKey: false });
TrackingBusinessesSchema.index({
  vipObjId: 1, userObjId: 1, isDeleted: 1,
}, {
  unique: true,
  partialFilterExpression: {
    isDeleted: { $eq: 'No' },
  },
});
const TrackingBusinessesModels = mongoose.model('tracking_businesses', TrackingBusinessesSchema);
module.exports = TrackingBusinessesModels;