const {
    configs: ConfigsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination, convertUpperCase
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.configCode = convertUpperCase(data.configCode);
        set.configName = trimValue(data.configName);
        set.value = data.value;
        set.detail = data.detail;
        set.unit = trimValue(data.unit);
        set.level = data.level;
        if (data?.expired) {
            set.expired = data.expired;
        }
        if (data?.canUpdate) {
            set.canUpdate = data.canUpdate;
        }
        if (data?.type) {
            set.type = data.type;
        }
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await ConfigsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (!isEmpty(data.type)) {
            conditions.type = data.type;
        }
        const populate = [];
        const options = {
            sort: {
                status: 1,
                [sortKey]: sortOrder,
            },
            page: +page,
            limit: +limit,
            lean: true,
            customLabels: MY_CUSTOM_LABELS,
            populate,
        };

        const result = await ConfigsModels.paginate(conditions, options);
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
        };
        const { status = STATUS[100] } = data;
        if (data?.configCode) {
            conditions.configCode = convertUpperCase(data.configCode);
        }
        if (data?.configObjId) {
            conditions._id = convertToObjectId(data.configObjId);
        }
        if (data?.position) {
            conditions['detail.position'] = convertUpperCase(data.position);
        }
        if (!isEmpty(data.type)) {
            conditions.type = data.type;
        }
        if (status) {
            conditions.status = status;
        }
        if (data?.getAll) {
            const result = await ConfigsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await ConfigsModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findLatestOrder = async () => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const result = await ConfigsModels.findOne(conditions).sort({ order: -1 });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.configObjId) {
            conditions._id = convertToObjectId(data.configObjId);
        }
        const set = {};
        if (isNumber(+data?.value)) {
            set.value = +data.value;
        }
        const result = await ConfigsModels.findOneAndUpdate(conditions, set, { new: true });
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
            _id: data.postObjId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await ConfigsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateStatus = async (data) => {
    try {
        const conditions = {};
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        const set = {};
        if (data?.postStatus) {
            set.postStatus = data.postStatus;
        }
        if (data?.expiredUpgradePost || '') {
            set.expiredUpgradePost = data.expiredUpgradePost;
        }
        if (data?.expiredDate) {
            set.expiredDate = data.expiredDate;
        }
        const result = await ConfigsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const approve = async (data) => {
    try {
        const conditions = {};
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        const set = {
            status: STATUS[100],
            expiredDate: data.expiredDate,
        };
        const result = await ConfigsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const inactive = async (data) => {
    try {
        const conditions = {};
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        const set = {
            status: STATUS[200],
            expiredDate: null,
        };
        const result = await ConfigsModels.findOneAndUpdate(conditions, set, { new: true });
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
    findLatestOrder,
    updateDelete,
    updateStatus,
    approve,
    inactive,
    list,
};
