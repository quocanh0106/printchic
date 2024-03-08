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
        set.titleUK = data.titleUK;
        set.titleUS = data.titleUS;
        set.titleFR = data.titleFR;
        set.titleDE = data.titleDE;

        set.handleUrlUK = data.handleUrlUK;
        set.handleUrlUS = data.handleUrlUS;
        set.handleUrlFR = data.handleUrlFR;
        set.handleUrlDE = data.handleUrlDE;

        set.metaDescriptionUK = data.metaDescriptionUK;
        set.metaDescriptionUS = data.metaDescriptionUS;
        set.metaDescriptionFR = data.metaDescriptionFR;
        set.metaDescriptionDE = data.metaDescriptionDE;

        set.typeUK = data.typeUK;
        set.typeUS = data.typeUS;
        set.typeFR = data.typeFR;
        set.typeDE = data.typeDE;

        set.categoryProduct = JSON.parse(data.categoryProduct)
        set.descriptionUK = data.descriptionUK;
        set.descriptionUS = data.descriptionUS;
        set.descriptionFR = data.descriptionFR;
        set.descriptionDE = data.descriptionDE;
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
        if (data?.categoryProductId) {
            conditions.categoryProductId = data?.categoryProductId;
        }
        if (data?.status) {
            conditions.status = data?.status;
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
            // populate: [
            //     populateModel('categoryProductId')
            // ]
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
        if (!isEmpty(data?.descriptionUK)) {
            set.descriptionUk = data.descriptionUk;
        }
        if (!isEmpty(data?.descriptionUS)) {
            set.descriptionUS = data.descriptionUS;
        }
        if (!isEmpty(data?.descriptionFR)) {
            set.descriptionFR = data.descriptionFR;
        }
        if (!isEmpty(data?.descriptionDE)) {
            set.descriptionDE = data.descriptionDE;
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
            ...data
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
