const {
    xkldCompanies: XKLDCompaniesModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, populateModel, lookupAggregate, unwindAggregate, facetPaginationAggregate, convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');

const list = async (data) => {
    try {
        const { sortKey = "companyName", sortOrder = 1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const options = {
            sort: {
                createdAt: -1,
                [sortKey]: sortOrder,
            },
            page: +page,
            limit: +limit,
            lean: true,
            customLabels: MY_CUSTOM_LABELS,
        };
        const result = await XKLDCompaniesModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}

module.exports = {
    list,
};
