const {
    tags: TagModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
    populateModel,
    responseError,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.titleUK = data.titleUK;
        set.titleUS = data.titleUS;
        set.titleDE = data.titleDE;
        set.titleFR = data.titleFR;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        const result = await TagModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "created", sortOrder = -1, page = 1, limit = 1000 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.titleUS) {
            conditions.titleUS = data?.titleUS;
        }
        if (data?.titleUK) {
            conditions.titleUK = data?.titleUK;
        }
        if (data?.titleFR) {
            conditions.titleFR = data?.titleFR;
        }
        if (data?.titleDE) {
            conditions.titleDE = data?.titleDE;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { titleUS: search },
                { titleUK: search },
                { titleFR: search },
                { titleDE: search },
            ]
        }
        const options = {
            sort: {
                createdAt: -1,
                [sortKey]: sortOrder,
            },
            page: +page,
            limit: +limit,
            lean: true,
            // select: REMOVE_FIELDS,
            customLabels: MY_CUSTOM_LABELS,
        };
        const result = await TagModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200]
        };
        if (data?.blogId) {
            conditions._id = convertToObjectId(data.blogId);
        }
        if (data?.getAll) {
            const result = await TagModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await TagModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}

const updateConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.blogId) {
            conditions._id = convertToObjectId(data.blogId);
        }
        const set = {};
        if (!isEmpty(data?.titleUK)) {
            set.titleUK = data.titleUK;
        }
        if (!isEmpty(data?.titleUS)) {
            set.titleUS = data.titleUS;
        }
        if (!isEmpty(data?.titleFR)) {
            set.titleFR = data.titleFR;
        }
        if (!isEmpty(data?.titleDE)) {
            set.titleDE = data.titleDE;
        }
        if (!isEmpty(data?.contentUK)) {
            set.contentUK = JSON.parse(data.contentUK);
        }
        if (!isEmpty(data?.contentUS)) {
            set.contentUS = JSON.parse(data.contentUS);
        }
        if (!isEmpty(data?.contentFR)) {
            set.contentFR = JSON.parse(data.contentFR);
        }
        if (!isEmpty(data?.contentDE)) {
            set.contentDE = JSON.parse(data.contentDE);
        }
        if (!isEmpty(data?.img)) {
            set.img = data.img;
        }
        if (!isEmpty(data?.status)) {
            set.status = data.status;
        }
        if (!isEmpty(data?.categoryBlogId)) {
            set.categoryBlogId = data.categoryBlogId;
        }
        if (!isEmpty(data?.recommendProduct)) {
            set.recommendProduct = JSON.parse(data.recommendProduct);
        }
        if (!isEmpty(data?.tags)) {
            set.tags = data.tags;
        }
        const result = await TagModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: data.blogId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await TagModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const updateStatus = async (data) => {
    try {
        const conditions = {};
        if (data?.blogId) {
            conditions._id = convertToObjectId(data.blogId);
        }
        const set = {};
        set.status = STATUS[data.status];
        const result = await TagModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}

const checkExist = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            ...data
        };
        const checkExistTitle = await TagModels.findOne(conditions);
        return promiseResolve(checkExistTitle);
    } catch (err) {
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
    updateConditions,
    updateDelete,
    updateStatus,
    list,
    checkExist
};
