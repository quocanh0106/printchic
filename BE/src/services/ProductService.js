const {
    products: ProductsModels,
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
        set.handleUrl = data.handleUrl;
        set.categoryProductTd = convertToObjectId(data.categoryProductTd);
        set.metaDescription = data.metaDescription;
        set.type = data.type;
        set.description = data.description;
        set.sku = data.sku;
        set.price = data.price;
        set.options = data.options;
        set.buttonLink = data.buttonLink;
        set.status = data.status;
        set.media = data.media;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        const result = await ProductsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "created", sortOrder = -1, page = 1, limit = 10 } = data;
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
        const result = await ProductsModels.paginate(conditions, options);
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
            const result = await CategoryProductModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await CategoryProductModels.findOne(conditions);
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
        if (data?.categoryProductId) {
            conditions._id = convertToObjectId(data.categoryProductId);
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
        if (!isEmpty(data?.parentCategory)) {
            set.parentCategory = data.parentCategory;
        }
        const result = await CategoryProductModels.findOneAndUpdate(conditions, set, { new: true });
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
            _id: data.productId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await ProductsModels.findOneAndUpdate(conditions, set, { new: true });
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
        const result = await CategoryProductModels.findOneAndUpdate(conditions, set, { new: true });
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