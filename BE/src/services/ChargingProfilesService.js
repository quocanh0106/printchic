const {
    charging_profiles: ChargingProfilesModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
    unwindAggregate,
    lookupAggregate,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.recruiterObjId = convertToObjectId(data.recruiterObjId);
        set.candidateObjId = convertToObjectId(data.candidateObjId);
        if (!isEmpty(data?.trackingBusinessObjId)) {
            set.trackingBusinessObjId = convertToObjectId(data.trackingBusinessObjId);
        }
        set.expiredTime = data.expiredTime;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await ChargingProfilesModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const listAggregate = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, page = 1, limit = 10, status = STATUS[100] } = data;
        const match = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.recruiterObjId) {
            match.recruiterObjId = convertToObjectId(data?.recruiterObjId);
        }
        const aggregateMatch = [];
        if (data?.countryObjId) {
            aggregateMatch.push({
                $match: { 'candidateObjId.countryObjId': data?.countryObjId },
            })
        }
        if (data?.gender) {
            aggregateMatch.push({
                $match: { 'candidateObjId.gender': data?.gender },
            })
        }
        if (data?.postObjId) {
            aggregateMatch.push({
                $match: { 'candidatePostObjId.postObjId': convertToObjectId(data?.postObjId) },
            })
        }
        const pipeline = [
            { $match: match },
            { $lookup: lookupAggregate('users', 'recruiterObjId', '_id', 'recruiterObjId') },
            { $unwind: unwindAggregate('$recruiterObjId') },
            { $lookup: lookupAggregate('users', 'candidateObjId', '_id', 'candidateObjId') },
            { $unwind: unwindAggregate('$candidateObjId') },
            { $lookup: lookupAggregate('user_posts', 'candidateObjId', 'userObjId', 'candidatePostObjId') },
            { $unwind: unwindAggregate('$candidatePostObjId') },
            {
                $project: {
                    'recruiterObjId.password': 0,
                    'candidateObjId.password': 0,
                }
            },
            ...aggregateMatch,
        ]
        const currentPage = +page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, +limit, +skip, {
                [sortKey]: +sortOrder
            }),
        });
        const result = await ChargingProfilesModels.aggregate(pipeline);
        return promiseResolve(convertResultAggregatePagination(result));
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const { status = STATUS[100] } = data;
        if (data?.recruiterObjId) {
            conditions.recruiterObjId = convertToObjectId(data.recruiterObjId);
        }
        if (data?.candidateObjId) {
            conditions.candidateObjId = convertToObjectId(data.candidateObjId);
        }
        if (data?.trackingBusinessObjId) {
            conditions.trackingBusinessObjId = convertToObjectId(data.trackingBusinessObjId);
        }
        if (status) {
            conditions.status = status;
        }
        if (data?.getAll) {
            const result = await ChargingProfilesModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await ChargingProfilesModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateDelete = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.chargingProfileObjId),
        };
        const set = {};
        set.isDeleted = IS_DELETED[300];
        const result = await ChargingProfilesModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    create,
    listAggregate,
    findByConditions,
    updateDelete,
};
