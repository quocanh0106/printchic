const {
    cities: CitiesModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, populateModel, lookupAggregate, unwindAggregate, facetPaginationAggregate, convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.cityName = data.cityName;
        set.countryObjId = convertToObjectId(data.countryObjId);
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        set.createdAt = generatorTime();
        set.createdBy = convertToObjectId(data.createdBy);
        const result = await CitiesModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const createMany = async (data) => {
    try {
        const result = await CitiesModels.insertMany(data.values);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.cityName) {
            conditions.cityName = data.cityName;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.cityName = search;
        }
        if (data?.countryObjId) {
            conditions.countryObjId = convertToObjectId(data.countryObjId);
        }
        if (data?.getAll) {
            const result = await CitiesModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await CitiesModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const softDeleteMany = async (data) => {
    try {
        const conditions = {};
        if (data?.countryObjId) {
            conditions.countryObjId = convertToObjectId(data.countryObjId);
        }
        const result = await CitiesModels.updateMany(conditions, {
            isDeleted: IS_DELETED[300]
        });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    create,
    findByConditions,
    createMany,
    softDeleteMany,
};
