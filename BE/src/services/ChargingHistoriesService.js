const {
    charging_histories: ChargingHistoriesModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { TYPE_CHARGING_HISTORIES } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.entityObjId = convertToObjectId(data.entityObjId);
        set.entityType = data.entityType;
        set.value = data.value;
        set.type = data.type;
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        const result = await ChargingHistoriesModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const listAggregate = async (data) => {
    try {
        const { sortKey = "", sortOrder = 1, page = 1, limit = 10, status = STATUS[100] } = data;
        const match = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.userObjId) {
            match.createdBy = convertToObjectId(data?.userObjId);
        }
        const mergePipeline = [];
        if (data?.createdAt) {
            mergePipeline.push(
                { $match: { dateGroup: data.createdAt } }
            )
        }
        const pipeline = [
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $addFields: {
                    createdAtDate: {
                        $dateFromString: {
                            dateString: '$createdAt',
                        },
                    },
                }
            },
            {
                $project: {
                    dateGroup: { $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" } },
                    otherFields: "$$ROOT"
                }
            },
            ...mergePipeline,
            {
                $group: {
                    _id: "$dateGroup",
                    dateKeeping: { $first: "$dateGroup" },
                    documents: { $push: "$otherFields" }
                }
            }
        ]
        const currentPage = +page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, +limit, +skip, {
                dateKeeping: -1,
            }),
        });
        const result = await ChargingHistoriesModels.aggregate(pipeline);
        return promiseResolve(convertResultAggregatePagination(result));
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const { startMonth, endMonth, startPrevMonth, endPrevMonth } = data;

        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const { status = STATUS[100] } = data;
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        if (data?.postStatuses) {
            conditions.postStatus = { $in: data.postStatuses };
        }
        if (data.type) {
            conditions.type = data.type;
        }
        if (status) {
            conditions.status = status;
        }
        if (startMonth && endMonth) {
            conditions.createdAt = { $gte: startMonth, $lte: endMonth };
        }
        if (startPrevMonth && endPrevMonth) {
            conditions.createdAt = { $gte: startPrevMonth, $lte: endPrevMonth };
        }
        if (data?.getAll) {
            const result = await ChargingHistoriesModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await ChargingHistoriesModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const revenueByYear = async (data) => {
    try {
        console.log(data.year, 'year')
        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: { $toDate: '$createdAt' } }, +data.year],
                    },
                },
            },
            {
                $match: {
                    type: {
                        $in: [TYPE_CHARGING_HISTORIES[300], TYPE_CHARGING_HISTORIES[600]]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: { $toDate: '$createdAt' } },
                        type: '$type',
                    },
                    totalPrice: { $sum: '$value.price' },
                },
            },
            {
                $group: {
                    _id: '$_id.type',
                    monthlyTotalPrice: {
                        $push: {
                            month: '$_id.month',
                            totalPrice: '$totalPrice',
                        },
                    },
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalRevenue' },
                    types: {
                        $push: {
                            type: '$_id',
                            monthlyTotalPrice: '$monthlyTotalPrice',
                        },
                    },
                },
            },
        ]
        const result = await ChargingHistoriesModels.aggregate(pipeline);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const totalRevenueByYear = async (data) => {
    try {
        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: { $toDate: '$createdAt' } }, data.year],
                    },
                },
            },
            {
                $match: {
                    type: {
                        $in: [TYPE_CHARGING_HISTORIES[300], TYPE_CHARGING_HISTORIES[600]]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        type: '$type',
                    },
                    totalRevenue: { $sum: '$value.price' },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalRevenue' },
                },
            },
        ]
        const result = await ChargingHistoriesModels.aggregate(pipeline);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: data.postObjId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
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
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
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
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
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
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
    revenueByYear,
    updateDelete,
    updateStatus,
    approve,
    inactive,
    listAggregate,
    totalRevenueByYear,
};
