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

        set.titleUK = data.titleUK;
        set.titleUS = data.titleUS;
        set.titleDE = data.titleDE;
        set.titleFR = data.titleFR;

        set.handleUrlUK = data.handleUrlUK;
        set.handleUrlUS = data.handleUrlUS;
        set.handleUrlDE = data.handleUrlDE;
        set.handleUrlFR = data.handleUrlFR;

        set.metaDescriptionUK = data.metaDescriptionUK;
        set.metaDescriptionUS = data.metaDescriptionUS;
        set.metaDescriptionDE = data.metaDescriptionDE;
        set.metaDescriptionFR = data.metaDescriptionFR;

        set.descriptionUK = data.descriptionUK;
        set.descriptionUS = data.descriptionUS;
        set.descriptionDE = data.descriptionDE;
        set.descriptionFR = data.descriptionFR;
        set.faq = data.faq;

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
                { titleUS: search },
                { titleUK: search },
                { titleFR: search },
                { titleDE: search },
            ]
        }
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
            isDeleted: IS_DELETED[200]
        };
        if (data?.categoryBlogId) {
            conditions._id = convertToObjectId(data.categoryBlogId);
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

        if (!isEmpty(data?.titleUK)) {
            set.titleUK = data.titleUK;
        }
        if (!isEmpty(data?.titleUS)) {
            set.titleUS = data.titleUS;
        }
        if (!isEmpty(data?.titleDE)) {
            set.titleDE = data.titleDE;
        }
        if (!isEmpty(data?.titleFR)) {
            set.titleFR = data.titleFR;
        }

        if (!isEmpty(data?.handleUrlUK)) {
            set.handleUrlUK = data.handleUrlUK;
        }
        if (!isEmpty(data?.handleUrlUS)) {
            set.handleUrlUS = data.handleUrlUS;
        }
        if (!isEmpty(data?.handleUrlDE)) {
            set.handleUrlDE = data.handleUrlDE;
        }
        if (!isEmpty(data?.handleUrlFR)) {
            set.handleUrlFR = data.handleUrlFR;
        }

        if (!isEmpty(data?.metaDescriptionUK)) {
            set.metaDescriptionUK = data.metaDescriptionUK;
        }
        if (!isEmpty(data?.metaDescriptionUS)) {
            set.metaDescriptionUS = data.metaDescriptionUS;
        }
        if (!isEmpty(data?.metaDescriptionDE)) {
            set.metaDescriptionDE = data.metaDescriptionDE;
        }
        if (!isEmpty(data?.metaDescriptionFR)) {
            set.metaDescriptionFR = data.metaDescriptionFR;
        }

        if (!isEmpty(data?.descriptionUK)) {
            set.descriptionUK = data.descriptionUK;
        }
        if (!isEmpty(data?.descriptionUS)) {
            set.descriptionUS = data.descriptionUS;
        }
        if (!isEmpty(data?.descriptionDE)) {
            set.descriptionDE = data.descriptionDE;
        }
        if (!isEmpty(data?.descriptionFR)) {
            set.descriptionFR = data.descriptionFR;
        }
        if (!isEmpty(data?.bannerImg)) {
            set.bannerImg = data.bannerImg;
        }
        if (!isEmpty(data?.faq)) {
            set.faq = data.faq;
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
            ...data
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
