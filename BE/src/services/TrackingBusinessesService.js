const {
    tracking_businesses: TrackingBusinessesModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject, populateModel,
} = require('../utils/shared');
const { IS_DELETED } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.vipObjId = convertToObjectId(data.vipObjId);
        set.userObjId = convertToObjectId(data.userObjId);
        set.expiredTime = data.expiredTime;
        set.isDeleted = IS_DELETED[200];
        const result = await TrackingBusinessesModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.trackingBusinessObjId) {
            conditions._id = convertToObjectId(data?.trackingBusinessObjId);
        }
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data?.userObjId);
        }
        if (data?.vipObjId) {
            conditions.vipObjId = convertToObjectId(data?.vipObjId);
        }
        const populate = [
            populateModel('vipObjId'),
        ]
        if (data?.getAll) {
            const result = await TrackingBusinessesModels.find(conditions).populate(populate).lean();
            return promiseResolve(result);
        }
        const result = await TrackingBusinessesModels.findOne(conditions).populate(populate).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: convertToObjectId(data.trackingBusinessObjId),
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await TrackingBusinessesModels.findOneAndUpdate(conditions, set, { new: true })
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
    updateDelete,
};
