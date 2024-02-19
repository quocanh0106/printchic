const {
    category_blog: CategoryBlogsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    console.log('data', data)
    try {
        const set = {};
        set.title = data.title;
        set.description = data.description;
        set.handleUrl = data.handleUrl;
        set.metaDescription = data.metaDescription;
        set.bannerImg = data.bannerImg;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        const result = await CategoryBlogsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "created", sortOrder = -1, page = 1, limit = 1000 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { title: search }
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
            // populate,
        };
        const result = await CategoryBlogsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            status: STATUS[100]
        };
        if (data?.newObjId) {
            conditions._id = convertToObjectId(data.newObjId);
        }
        if (data?.getAll) {
            const result = await CategoryBlogsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await CategoryBlogsModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}

const updateConditions = async (data) => {
    console.log('data', data)
    try {
        const conditions = {};
        if (data?.categoryBlogId) {
            conditions._id = convertToObjectId(data.categoryBlogId);
        }
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (!isEmpty(data?.bannerImg)) {
            set.bannerImg = data.bannerImg;
        }
        if (!isEmpty(data?.handleUrl)) {
            set.handleUrl = data.handleUrl;
        }
        if (!isEmpty(data?.metaDescription)) {
            set.metaDescription = data.metaDescription;
        }
        const result = await CategoryBlogsModels.findOneAndUpdate(conditions, set, { new: true });
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
            _id: data.categoryBlogId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await CategoryBlogsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateStatus = async (data) => {
    try {
        const conditions = {};
        if (data?.newObjId) {
            conditions._id = convertToObjectId(data.newObjId);
        }
        const set = {};
        set.status = STATUS[data.status];
        const result = await CategoryBlogsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}

const checkExist = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            title: data?.title
        };
        const checkExistTitle = await CategoryBlogsModels.findOne(conditions);
        return promiseResolve(checkExistTitle);
    } catch (err) {
        console.log(err, 'err')
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
