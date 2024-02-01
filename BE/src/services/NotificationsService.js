const {
    notifications: NotificationsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,

} = require('../utils/shared');
const { IS_DELETED, STATUS, MY_CUSTOM_LABELS, YES_NO } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.senderObjId = convertToObjectId(data.senderObjId);
        set.receiverObjId = convertToObjectId(data.receiverObjId);
        set.notifyType = data.notifyType;
        set.notifyTitle = data.notifyTitle;
        set.notifyContent = data.notifyContent;
        if (!isEmpty(data.image)) {
            set.image = data.image;
        }
        set.relatedObjId = convertToObjectId(data.relatedObjId);
        set.relatedType = data.relatedType;
        if (!isEmpty(data.notifyData)) {
            set.notifyData = data.notifyData;
        }
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await NotificationsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const { sortKey = 'createdAt', sortOrder = -1 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
            status: STATUS[100],
        };
        if (data?.getAll) {
            const result = await NotificationsModels.find(conditions).sort({ [sortKey]: +sortOrder }).lean();
            return promiseResolve(result);
        }
        const result = await NotificationsModels.findOne(conditions).sort({ [sortKey]: +sortOrder }).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.advertisementObjId),
        };
        const set = {};
        set.isDeleted = IS_DELETED[300];
        const result = await NotificationsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { page = 1, limit = 10 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
            status: STATUS[100],
        };
        if (!isEmpty(data.receiverObjId)) {
            conditions.receiverObjId = convertToObjectId(data.receiverObjId);
        }
        const addFields = {
            customOrder: {
                $cond: {
                    if: { $eq: ['$isRead', YES_NO[200]] },
                    then: 1,
                    else: 2
                }
            }
        }
        const pipeline = [
            { $addFields: addFields },
            { $match: conditions },
            { $sort: { customOrder: -1 } },
            {
                $project: {
                    createdAt: 1,
                    isRead: 1,
                    notifyContent: 1,
                    notifyTitle: 1,
                    _id: 1,
                }
            }
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { createdAt: -1 }),
        });
        const result = await NotificationsModels.aggregate(pipeline);
        return promiseResolve(convertResultAggregatePagination(result, currentPage, limit));
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const read = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.notificationObjId),
            receiverObjId: convertToObjectId(data.receiverObjId)
        };
        const set = {};
        set.isRead = YES_NO[200];
        set.updatedAt = generatorTime();
        set.updatedBy = data.updatedBy;
        const result = await NotificationsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const readAll = async (data) => {
    try {
        const conditions = {
            receiverObjId: convertToObjectId(data.receiverObjId)
        };
        const set = {};
        set.isRead = YES_NO[200];
        set.updatedAt = generatorTime();
        set.updatedBy = data.updatedBy;
        const result = await NotificationsModels.updateMany(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const total = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            status: STATUS[100],
        };
        if (!isEmpty(data?.receiverObjId)) {
            conditions.receiverObjId = convertToObjectId(data.receiverObjId);
        }
        const result = await NotificationsModels.count(conditions);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    create,
    findByConditions,
    list,
    updateDelete,
    read,
    readAll,
    total,
};
