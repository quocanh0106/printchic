const {
    products: ProductsModels,
    category_product: CategoryProductModels,
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
        set.title = data.title;
        set.handleUrl = data.handleUrl;
        set.categoryProductId = convertToObjectId(data.categoryProductId);
        set.metaDescription = data.metaDescription;
        set.type = data.type;
        set.description = data.description;
        set.variants = JSON.parse(data.variants);
        set.status = data.status;
        set.media = data.media;
        set.currency = data.currency;
set.price = data.price;
        set.priceSale = data.priceSale;
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
                populateModel('categoryProductId')
            ]
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
            isDeleted: IS_DELETED[200]
        };
        if (data?.productId) {
            conditions._id = convertToObjectId(data.productId);
        }
        if (data?.getAll) {
            const result = await ProductsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await ProductsModels.findOne(conditions);
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
        if (data?.productId) {
            conditions._id = convertToObjectId(data.productId);
        }
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.handleUrl)) {
            set.handleUrl = data.handleUrl;
        }
        if (!isEmpty(data?.categoryProductId)) {
            set.categoryProductId = convertToObjectId(data?.categoryProductId || '');
        }
        if (!isEmpty(data?.metaDescription)) {
            set.metaDescription = data.metaDescription;
        }
        if (!isEmpty(data?.type)) {
            set.type = data.type;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (!isEmpty(data?.variants)) {
            set.variants = JSON.parse(data.variants);
        }
        if (!isEmpty(data?.status)) {
            set.status = data.status;
        }
        if (!isEmpty(data?.media)) {
            set.media = data.media;
        }
        if (!isEmpty(data?.currency)) {
            set.currency = data.currency;
        }
if (!isEmpty(data?.price)) {
            set.price = data.price;
        }
        if (!isEmpty(data?.priceSale)) {
            set.priceSale = data.priceSale;
        }
        const result = await ProductsModels.findOneAndUpdate(conditions, set, { new: true });
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


const checkExist = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            title: data?.title
        };
        const checkExistTitle = await ProductsModels.findOne(conditions);
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
