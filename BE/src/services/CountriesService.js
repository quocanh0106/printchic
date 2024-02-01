const {
    countries: CountriesModels,
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
        set.countryName = data.countryName;
        if (data?.logo) {
            set.logo = data.logo;
        }
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        set.createdAt = generatorTime();
        set.createdBy = convertToObjectId(data.createdBy);
        const result = await CountriesModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.countryName) {
            conditions.countryName = data.countryName;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.countryName = search;
        }
        if (data?.getAll) {
            const result = await CountriesModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await CountriesModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const update = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.countryObjId) {
            conditions._id = convertToObjectId(data.countryObjId);
        }
        const set = {};
        if (data?.logo) {
            set.logo = data.logo;
        }
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.countryName = trimValue(data.countryName);
        const result = await CountriesModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const softDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: convertToObjectId(data.countryObjId),
        };
        const updatedBy = convertToObjectId(data.createdBy);
        const set = {
            isDeleted: IS_DELETED[300],
            updatedBy,
            updatedAt: generatorTime(),
        }
        const result = await CountriesModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { page = 1, limit = 10 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { countryName: search },
            ]
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
        const result = await CountriesModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const listAggregate = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, limit = 10 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { countryName: search },
            ]
        }
        const pipeline = [
            { $match: conditions },
            { $lookup: lookupAggregate('cities', '_id', 'countryObjId', 'cityObjId') },
            { $unwind: unwindAggregate('$cityObjId') },
            {
                $group: {
                    _id: '$_id',
                    cities: { $push: '$cityObjId' },
                    logo: { $first: '$logo' },
                    countryName: { $first: '$countryName' },
                },
            },
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { [sortKey]: +sortOrder }),
        });
        const result = await CountriesModels.aggregate(pipeline);
        return promiseResolve(
            convertResultAggregatePagination(result, currentPage, limit),
        );
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
    update,
    softDelete,
    list,
    listAggregate,
};
