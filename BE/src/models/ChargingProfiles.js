const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ChargingProfilesBase = {
    recruiterObjId: {
        type: ObjectId, default: null, require: true, ref: 'users',
    },
    candidateObjId: {
        type: ObjectId, default: null, require: true, ref: 'users',
    },
    expiredTime: {
        type: String, default: null,
    },
    trackingBusinessObjId: {
        type: ObjectId, ref: 'tracking_businesses', default: null,
    },
}
const ChargingProfiles = { ...ChargingProfilesBase, ...common };
const ChargingProfilesSchema = new Schema(ChargingProfiles, { versionKey: false });
ChargingProfilesSchema.index({
    recruiterObjId: 1, candidateObjId: 1, isDeleted: 1,
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: 'No' },
    },
});
const ChargingProfilesModels = mongoose.model('charging_profiles', ChargingProfilesSchema);
module.exports = ChargingProfilesModels;