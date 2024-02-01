const {
    advertisements: AdvertisementsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
    convertUpperCase,
} = require('../utils/shared');
const { IS_DELETED, STATUS, MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.position = convertUpperCase(data.position);
        set.configObjId = convertToObjectId(data.configObjId);
        set.revenue = data.revenue;
        set.advertisementName = data.advertisementName;
        set.url = data.url;
        set.startDate = data.startDate;
        set.endDate = data.endDate;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await AdvertisementsModels.create(set);
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
            status: STATUS[100],
        };
        if (data?.position) {
            conditions.position = convertUpperCase(data.position);
        }
        if (data?.getAll) {
            const result = await AdvertisementsModels.find(conditions).sort({ [sortKey]: +sortOrder }).lean();
            return promiseResolve(result);
        }
        const result = await AdvertisementsModels.findOne(conditions).sort({ [sortKey]: +sortOrder }).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.advertisementObjId),
        };
        const set = {};
        set.isDeleted = IS_DELETED[300];
        const result = await AdvertisementsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (status) {
            conditions.status = status;
        }
        if (data?.position) {
            conditions.position = convertUpperCase(data.position);
        }
        if (data?.configObjId) {
            conditions.configObjId = convertToObjectId(data.configObjId);
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { advertisementName: search },
            ]
        }
        if (data?.startDate) {
            conditions.startDate = { $gte: data.startDate };
        }
        if (data?.endDate) {
            conditions.endDate = { $lte: data.endDate };
        }
        const populate = [];
        const options = {
            sort: {
                createdAt: -1,
            },
            page: +page,
            limit: +limit,
            lean: true,
            customLabels: MY_CUSTOM_LABELS,
            populate,
        };
        const result = await AdvertisementsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const update = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.advertisementObjId),
        };
        const set = {};
        if (!isEmpty(data.advertisementName)) {
            set.advertisementName = trimValue(data.advertisementName);
        }
        if (!isEmpty(data.url)) {
            set.url = trimValue(data.url);
        }
        set.updatedAt = generatorTime();
        set.updatedBy = data.updatedBy;
        const result = await AdvertisementsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    create,
    findByConditions,
    list,
    updateDelete,
    update,
};
