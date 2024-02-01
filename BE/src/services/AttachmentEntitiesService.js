const {
    attachment_entities: AttachmentEntitiesServices,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination, populateModel,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.attachmentObjId = convertToObjectId(data.attachmentObjId);
        set.entityObjId = convertToObjectId(data.entityObjId);
        set.entityType = data.entityType;
        set.type = data.type;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await AttachmentEntitiesServices.create(set);
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
        };
        const { status = STATUS[100] } = data;
        if (data?.entityObjId) {
            conditions.entityObjId = convertToObjectId(data.entityObjId);
        }
        if (data?.attachmentObjId) {
            conditions.attachmentObjId = convertToObjectId(data.attachmentObjId);
        }
        if (data?.type) {
            conditions.type = data.type;
        }
        if (status) {
            conditions.status = status;
        }
        const populate = [
            populateModel('attachmentObjId')
        ]
        if (data?.getAll) {
            const result = await AttachmentEntitiesServices.find(conditions).populate(populate).sort({ [sortKey]: +sortOrder });
            return promiseResolve(result);
        }
        const result = await AttachmentEntitiesServices.findOne(conditions).populate(populate).sort({ [sortKey]: +sortOrder });
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
            attachmentObjId: convertToObjectId(data.attachmentObjId),
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await AttachmentEntitiesServices.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateMany = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            entityObjId: convertToObjectId(data.entityObjId),
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await AttachmentEntitiesServices.updateMany(conditions, set);
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
    updateMany
};
