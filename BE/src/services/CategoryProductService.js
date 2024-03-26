const {
    category_product: CategoryProductModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.titleUK = data?.titleUK;
        set.titleUS = data?.titleUS;
        set.titleDE = data?.titleDE;
        set.titleFR = data?.titleFR;

        set.descriptionUK = data?.descriptionUK;
        set.descriptionUS = data?.descriptionUS;
        set.descriptionDE = data?.descriptionDE;
        set.descriptionFR = data?.descriptionFR;

        set.pajamasUK = data?.pajamasUK;
        set.pajamasUS = data?.pajamasUS;
        set.pajamasFR = data?.pajamasFR;
        set.pajamasDE = data?.pajamasDE;

        set.paragraphUK = data?.paragraphUK;
        set.paragraphUS = data?.paragraphUS;
        set.paragraphFR = data?.paragraphFR;
        set.paragraphDE = data?.paragraphDE;

        set.parentCategory = data?.parentCategory;

        set.handleUrlUK = data?.handleUrlUK;
        set.handleUrlUS = data?.handleUrlUS;
        set.handleUrlFR = data?.handleUrlFR;
        set.handleUrlDE = data?.handleUrlDE;

        set.metaTitleUK = data?.metaTitleUK;
        set.metaTitleUS = data?.metaTitleUS;
        set.metaTitleDE = data?.metaTitleDE;
        set.metaTitleFR = data?.metaTitleFR;

        set.childCategory = JSON.parse(data?.childCategory);
        set.bannerImg = data?.bannerImg;
        set.faq = data?.faq;
        set.createdBy = convertToObjectId(data?.createdBy);
        set.createdAt = generatorTime();
        const result = await CategoryProductModels.create(set);
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
            // populate,
        };
        const result = await CategoryProductModels.paginate(conditions, options);
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
        if (data?.categoryProductId) {
            conditions._id = convertToObjectId(data.categoryProductId);
        }
        if (data?.getAll) {
            const result = await CategoryProductModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await CategoryProductModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        
        return promiseReject(err);
    }
}

const updateConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.categoryProductId) {
            conditions._id = convertToObjectId(data.categoryProductId);
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
        if (!isEmpty(data?.childCategory)) {
            set.childCategory = JSON.parse(data.childCategory);
        }
        if (!isEmpty(data?.pajamasUK)) {
            set.pajamasUk = data.pajamasUk;
        }
        if (!isEmpty(data?.pajamasUS)) {
            set.pajamasUS = data.pajamasUS;
        }
        if (!isEmpty(data?.pajamasFR)) {
            set.pajamasFR = data.pajamasFR;
        }
        if (!isEmpty(data?.pajamasDE)) {
            set.pajamasDE = data.pajamasDE;
        }

        if (!isEmpty(data?.paragraphUK)) {
            set.paragraphUk = data.paragraphUk;
        }
        if (!isEmpty(data?.paragraphUS)) {
            set.paragraphUS = data.paragraphUS;
        }
        if (!isEmpty(data?.paragraphFR)) {
            set.paragraphFR = data.paragraphFR;
        }
        if (!isEmpty(data?.paragraphDE)) {
            set.paragraphDE = data.paragraphDE;
        }

        if (!isEmpty(data?.parentCategory)) {
            set.parentCategory = data.parentCategory;
        }

        if (!isEmpty(data?.handleUrlUK)) {
            set.handleUrlUk = data.handleUrlUk;
        }
        if (!isEmpty(data?.handleUrlUS)) {
            set.handleUrlUS = data.handleUrlUS;
        }
        if (!isEmpty(data?.handleUrlFR)) {
            set.handleUrlFR = data.handleUrlFR;
        }
        if (!isEmpty(data?.handleUrlDE)) {
            set.handleUrlDE = data.handleUrlDE;
        }

        if (!isEmpty(data?.metaTitleUK)) {
            set.metaTitleUK = data.metaTitleUK;
        }
        if (!isEmpty(data?.metaTitleUS)) {
            set.metaTitleUS = data.metaTitleUS;
        }
        if (!isEmpty(data?.metaTitleFR)) {
            set.metaTitleFR = data.metaTitleFR;
        }
        if (!isEmpty(data?.metaTitleDE)) {
            set.metaTitleDE = data.metaTitleDE;
        }

        if (!isEmpty(data?.faq)) {
            set.faq = data.faq;
        }

        const result = await CategoryProductModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: data.categoryProductId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await CategoryProductModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        
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
        
        return promiseReject(err);
    }
}

const checkExist = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            ...data
        };
        const checkExistTitle = await CategoryProductModels.findOne(conditions);
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
