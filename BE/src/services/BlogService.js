const {
    blogs: BlogsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
    populateModel,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    console.log('data', data)
    try {
        const set = {};
        set.categoryBlogId = data.categoryBlogId;
        set.status = data.status;
        set.img = data.img;
        set.tags = data.tags;
        set.title = data.title;
        set.recommendProduct = data.recommendProduct;
        set.content = data.content;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        const result = await BlogsModels.create(set);
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
            populate : [
                populateModel('categoryBlogId')
            ]
        };
        const result = await BlogsModels.paginate(conditions, options);
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
            const result = await BlogsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await BlogsModels.findOne(conditions);
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
        if (data?.blogId) {
            conditions._id = convertToObjectId(data.blogId);
        }
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.content)) {
            set.content = data.content;
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
            set.recommendProduct = data.recommendProduct;
        }
        if (!isEmpty(data?.tags)) {
            set.tags = data.tags;
        }
        const result = await BlogsModels.findOneAndUpdate(conditions, set, { new: true });
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
            _id: data.blogId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await BlogsModels.findOneAndUpdate(conditions, set, { new: true });
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
        const result = await BlogsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
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
};
