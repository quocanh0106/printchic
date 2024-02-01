const {
    attachments: AttachmentsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.name = trimValue(data.name);
        set.link = trimValue(data.link);
        set.type = trimValue(data.type);
        set.size = data.size;
        set.note = data.note || '';
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await AttachmentsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: convertToObjectId(data.attachmentObjId),
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await AttachmentsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
module.exports = {
    create,
    updateDelete,
};
