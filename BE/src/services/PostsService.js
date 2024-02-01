const {
    posts: PostsModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination, lookupAggregate, unwindAggregate,
    populateModel
} = require('../utils/shared');
const { IS_DELETED, STATUS, POST_TYPE } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.countryObjId)) {
            set.countryObjId = data.countryObjId;
        }
        if (!isEmpty(data?.provinceObjId)) {
            set.provinceObjId = data.provinceObjId;
        }
        if (!isEmpty(data?.companyObjId)) {
            set.companyObjId = data.companyObjId;
        }
        if (!isEmpty(data?.companyLogo)) {
            set.companyLogo = data.companyLogo;
        }
        if (!isEmpty(data?.jobObjId)) {
            set.jobObjId = data.jobObjId;
        }
        if (!isEmpty(data?.jobDescription)) {
            set.jobDescription = data.jobDescription;
        }
        if (!isEmpty(data?.image)) {
            set.image = data.image;
        }
        if (!isEmpty(data?.examPlace)) {
            set.examPlace = data.examPlace;
        }
        if (!isEmpty(data?.workingTime)) {
            set.workingTime = data.workingTime;
        }
        if (isNumber(data?.salary)) {
            set.salary = data.salary;
        }
        if (isNumber(data?.expectedIncome)) {
            set.expectedIncome = data.expectedIncome;
        }
        if (!isEmpty(data?.isOverTime)) {
            set.isOverTime = data.isOverTime;
        }
        if (!isEmpty(data?.benefit)) {
            set.benefit = data.benefit;
        }
        if (isNumber(data?.numberOfRecruits)) {
            set.numberOfRecruits = data.numberOfRecruits;
        }
        if (!isEmpty(data?.contractObjId)) {
            set.contractObjId = data.contractObjId;
        }
        if (data?.gender) {
            set.gender = data.gender;
        }
        if (!isEmpty(data?.gender)) {
            set.gender = data.gender;
        }
        if (!isEmpty(data?.fromBorn)) {
            set.fromBorn = data.fromBorn;
        }
        if (!isEmpty(data?.endBorn)) {
            set.endBorn = data.endBorn;
        }
        if (!isEmpty(data?.education)) {
            set.education = data.education;
        }
        if (!isEmpty(data?.languages)) {
            set.languages = data.languages;
        }
        if (!isEmpty(data?.experiences)) {
            set.experiences = data.experiences;
        }
        if (data?.healthCondition === true || data?.healthCondition === false) {
            set.healthCondition = data.healthCondition;
        }
        if (!isEmpty(data?.eyesight)) {
            set.eyesight = data.eyesight;
        }
        if (!isEmpty(data?.isHepatitis)) {
            set.isHepatitis = data.isHepatitis;
        }
        if (!isEmpty(data?.isTattoo)) {
            set.isTattoo = data.isTattoo;
        }
        if (!isEmpty(data?.otherRequirement)) {
            set.otherRequirement = data.otherRequirement;
        }
        if (!isEmpty(data?.examForm)) {
            set.examForm = data.examForm;
        }
        if (!isEmpty(data?.examDate)) {
            set.examDate = data.examDate;
        }
        if (!isEmpty(data?.expiredDate)) {
            set.expiredDate = data.expiredDate;
        }
        if (!isEmpty(data?.exportDate)) {
            set.exportDate = data.exportDate;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (isNumber(data?.exportFee)) {
            set.exportFee = data.exportFee;
        }
        if (!isEmpty(data?.workmanship)) {
            set.workmanship = data.workmanship;
        }
        if (!isEmpty(data?.detailImages)) {
            set.detailImages = data.detailImages;
        }
        if (!isEmpty(data?.currency)) {
            set.currency = data.currency;
        }
        if (!isEmpty(data?.statusPost)) {
            set.statusPost = data.statusPost;
        }
        if (!isEmpty(data?.expiredTime)) {
            set.expiredTime = data.expiredTime;
        }
        if (!isEmpty(data?.configObjId)) {
            set.configObjId = convertToObjectId(data.configObjId);
        }
        if (!isEmpty(data?.postStatus)) {
            set.postStatus = data.postStatus;
        }
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[300];
        set.isDeleted = IS_DELETED[200];
        set.postId = await PostsModels.count() + 1;
        const result = await PostsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const createExternal = async (data) => {
    try {
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.companyObjId)) {
            set.companyObjId = data.companyObjId;
        }
        if (!isEmpty(data?.jobDescription)) {
            set.jobDescription = data.jobDescription;
        }
        if (!isEmpty(data?.jobObjId)) {
            set.jobObjId = data.jobObjId;
        }
        if (!isEmpty(data?.image)) {
            set.image = data.image;
        }
        if (!isEmpty(data?.examPlace)) {
            set.examPlace = data.examPlace;
        }
        if (!isEmpty(data?.workingTime)) {
            set.workingTime = data.workingTime;
        }
        if (isNumber(data?.salary)) {
            set.salary = data.salary;
        }
        if (isNumber(data?.numberOfRecruits)) {
            set.numberOfRecruits = data.numberOfRecruits;
        }
        if (!isEmpty(data?.expiredDate)) {
            set.expiredDate = data.expiredDate;
        }
        if (!isEmpty(data?.benefit)) {
            set.benefit = data.benefit;
        }
        if (!isEmpty(data?.companyAddress)) {
            set.companyAddress = data.companyAddress;
        }
        if (!isEmpty(data?.expiredTime)) {
            set.expiredTime = data.expiredTime;
        }
        set.createdBy = convertToObjectId(data.createdBy);
        set.createdAt = generatorTime();
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        set.postType = POST_TYPE[100];
        set.postId = (await PostsModels.count()) + 1;
        const result = await PostsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "title", sortOrder = 1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.userObjId) {
            conditions.createdBy = convertToObjectId(data.userObjId);
        }
        if (status) {
            conditions.status = status;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { title: search },
            ]
        }
        if (data?.countryObjId) {
            conditions.countryObjId = trimValue(data.countryObjId);
        }
        if (data?.jobObjId) {
            conditions.jobObjId = trimValue(data.jobObjId);
        }
        if (data?.examPlace) {
            conditions.examPlace = trimValue(data.examPlace);
        }
        if (data?.gender) {
            conditions.gender = trimValue(data.gender);
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

        const result = await PostsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const listAggregate = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
            postType: POST_TYPE[200],
        };
        if (data?.userObjId) {
            conditions.createdBy = convertToObjectId(data.userObjId);
        }
        if (data.postStatus) {
            conditions.postStatus = data.postStatus;
        }
        if (data?.postTypes) {
            conditions.postType = { $in: data?.postTypes };
        }
        if (data.status) {
            conditions.status = status;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { title: search },
                { _id: convertToObjectId(data.search) },
            ]
        }
        console.log(conditions, 'condtions')
        if (data?.countryObjId) {
            conditions.countryObjId = convertToObjectId(data.countryObjId);
        }
        if (data?.provinceObjId) {
            conditions.provinceObjId = convertToObjectId(data.provinceObjId);
        }
        if (data?.jobObjId) {
            conditions.jobObjId = trimValue(data.jobObjId);
        }
        if (data?.examPlace) {
            conditions.examPlace = trimValue(data.examPlace);
        }
        if (data?.gender) {
            conditions.gender = trimValue(data.gender);
        }
        if (data?.createdAt) {
            conditions.createdAt = regExpSearch(data.createdAt);

        }
        const addFields = {
            customOrder: {
                $cond: {
                    if: { $eq: ['$postStatus', 'FREE'] },
                    then: 1,
                    else: {
                        $cond: {
                            if: { $eq: ['$postStatus', 'NORMAL'] },
                            then: 2,
                            else: {
                                $cond: {
                                    if: { $eq: ['$postStatus', 'VIP3'] },
                                    then: 3,
                                    else: {
                                        $cond: {
                                            if: { $eq: ['$postStatus', 'VIP2'] },
                                            then: 4,
                                            else: 5
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            }
        };
        const pipeline = [
            { $addFields: addFields },
            { $match: conditions },
            { $sort: { customOrder: -1 } },
            { $lookup: lookupAggregate('users', 'createdBy', '_id', 'createdBy') },
            { $unwind: unwindAggregate('$createdBy') },
            { $lookup: lookupAggregate('tracking_businesses', 'createdBy.trackingBusinessObjId', '_id', 'createdBy.trackingBusinessObjId') },
            { $unwind: unwindAggregate('$createdBy.trackingBusinessObjId') },
            { $lookup: lookupAggregate('configs', 'createdBy.trackingBusinessObjId.vipObjId', '_id', 'createdBy.trackingBusinessObjId.vipObjId') },
            { $unwind: unwindAggregate('$createdBy.trackingBusinessObjId.vipObjId') },
            { $lookup: lookupAggregate('countries', 'countryObjId', '_id', 'countryObjId') },
            { $unwind: unwindAggregate('$countryObjId') },
            { $lookup: lookupAggregate('cities', 'provinceObjId', '_id', 'provinceObjId') },
            { $unwind: unwindAggregate('$provinceObjId') },
            { $lookup: lookupAggregate('configs', 'configObjId', '_id', 'configObjId') },
            { $unwind: unwindAggregate('$configObjId') },
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        const customFacet = {
            expiredValue:
                [
                    { $match: { status: STATUS[200] } },
                    { $count: 'value' }
                ],
            activeValue:
                [
                    { $match: { status: STATUS[100] } },
                    { $count: 'value' }
                ],
            waitingValue:
                [
                    { $match: { status: STATUS[300] } },
                    { $count: 'value' }
                ],
        }
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { [sortKey]: +sortOrder }, customFacet),
        });
        pipeline.push({
            $addFields: {
                totalExpired: { $arrayElemAt: ["$expiredValue", 0] },
                totalActive: { $arrayElemAt: ["$activeValue", 0] },
                totalWaiting: { $arrayElemAt: ["$waitingValue", 0] },
            }
        })
        const result = await PostsModels.aggregate(pipeline);
        return promiseResolve(
            {
                ...convertResultAggregatePagination(result, currentPage, limit),
                totalExpired: result[0]?.totalExpired || 0,
                totalActive: result[0]?.totalActive,
                totalWaiting: result[0]?.totalWaiting || 0,
            });
    } catch (errors) {
        return promiseReject(errors);
    }
}
const listVIP = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
            status: STATUS[100],
            postType: POST_TYPE[200],
        };
        if (data?.postStatus) {
            conditions.postStatus = data.postStatus;
        }
        if (data?.postStatuses) {
            conditions.postStatus = { $in: data.postStatuses };
        }
        const pipeline = [
            { $match: conditions },
            { $lookup: lookupAggregate('users', 'createdBy', '_id', 'createdBy') },
            { $unwind: unwindAggregate('$createdBy') },
            { $lookup: lookupAggregate('tracking_businesses', 'createdBy.trackingBusinessObjId', '_id', 'createdBy.trackingBusinessObjId') },
            { $unwind: unwindAggregate('$createdBy.trackingBusinessObjId') },
            { $lookup: lookupAggregate('configs', 'createdBy.trackingBusinessObjId.vipObjId', '_id', 'createdBy.trackingBusinessObjId.vipObjId') },
            { $unwind: unwindAggregate('$createdBy.trackingBusinessObjId.vipObjId') },
            { $lookup: lookupAggregate('countries', 'countryObjId', '_id', 'countryObjId') },
            { $unwind: unwindAggregate('$countryObjId') },
            { $lookup: lookupAggregate('cities', 'provinceObjId', '_id', 'provinceObjId') },
            { $unwind: unwindAggregate('$provinceObjId') },
            { $lookup: lookupAggregate('configs', 'configObjId', '_id', 'configObjId') },
            { $unwind: unwindAggregate('$configObjId') },
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { [sortKey]: +sortOrder }),
        });
        const result = await PostsModels.aggregate(pipeline);
        return promiseResolve(
            {
                ...convertResultAggregatePagination(result, currentPage, limit),
            });
    } catch (errors) {
        return promiseReject(errors);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const { status } = data;
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        if (data?.postId) {
            conditions.postId = +data.postId;
        }
        if (data?.postStatuses) {
            conditions.postStatus = { $in: data.postStatuses };
        }
        if (data?.postStatus) {
            conditions.postStatus = data.postStatus;
        }
        if (data?.startToday && data?.endToday) {
            conditions.$and = [
                {
                    createdAt: { $gte: data.startToday }
                },
                {
                    createdAt: { $lte: data.endToday }
                },
            ]
        }
        if (status) {
            conditions.status = status;
        }
        if (data?.trackingBusinessObjId) {
            conditions.trackingBusinessObjId = convertToObjectId(data.trackingBusinessObjId);
        }
        const populate = [
            populateModel('countryObjId'),
            populateModel('provinceObjId'),
            populateModel('createdBy', '-password'),
            populateModel('configObjId'),
        ];
        let selectField = '';
        if (data?.selectField) {
            selectField = '_id companyObjId createdAt title jobObjId';
        }
        if (data?.getAll) {
            const result = await PostsModels.find(conditions, selectField);
            return promiseResolve(result);
        }
        const result = await PostsModels.findOne(conditions).populate(populate);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const countByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const { status } = data;
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        if (data?.postStatuses) {
            conditions.postStatus = { $in: data.postStatuses };
        }
        if (status) {
            conditions.status = status;
        }
        const populate = [
            populateModel('createdBy', '-password'),
        ];
        if (data?.getAll) {
            const result = await PostsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await PostsModels.findOne(conditions).populate(populate);
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
        const result = await PostsModels.findOne(conditions).sort({ order: -1 });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}

const updateConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.countryObjId)) {
            set.countryObjId = data.countryObjId;
        }
        if (!isEmpty(data?.provinceObjId)) {
            set.provinceObjId = data.provinceObjId;
        }
        if (!isEmpty(data?.companyObjId)) {
            set.companyObjId = data.companyObjId;
        }
        if (!isEmpty(data?.companyLogo)) {
            set.companyLogo = data.companyLogo;
        }
        if (!isEmpty(data?.jobObjId)) {
            set.jobObjId = data.jobObjId;
        }
        if (!isEmpty(data?.jobDescription)) {
            set.jobDescription = data.jobDescription;
        }
        if (!isEmpty(data?.image)) {
            set.image = data.image;
        }
        if (!isEmpty(data?.examPlace)) {
            set.examPlace = data.examPlace;
        }
        if (!isEmpty(data?.workingTime)) {
            set.workingTime = data.workingTime;
        }
        if (!isNumber(data?.salary)) {
            set.salary = data.salary;
        }
        if (!isNumber(data?.expectedIncome)) {
            set.expectedIncome = data.expectedIncome;
        }
        if (!isEmpty(data?.isOverTime)) {
            set.isOverTime = data.isOverTime;
        }
        if (!isEmpty(data?.benefits)) {
            set.benefits = data.benefits;
        }
        if (!isNumber(data?.numberOfRecruits)) {
            set.numberOfRecruits = data.numberOfRecruits;
        }
        if (!isEmpty(data?.contractObjId)) {
            set.contractObjId = data.contractObjId;
        }
        if (data?.gender) {
            set.gender = data.gender;
        }
        if (!isEmpty(data?.gender)) {
            set.gender = data.gender;
        }
        if (!isEmpty(data?.fromBorn)) {
            set.fromBorn = data.fromBorn;
        }
        if (!isEmpty(data?.endBorn)) {
            set.endBorn = data.endBorn;
        }
        if (!isEmpty(data?.education)) {
            set.education = data.education;
        }
        if (!isEmpty(data?.languages)) {
            set.languages = data.languages;
        }
        if (!isEmpty(data?.experiences)) {
            set.experiences = data.experiences;
        }
        if (data?.healthCondition == 'true' || data?.healthCondition == 'false') {
            set.healthCondition = data.healthCondition;
        }
        if (!isEmpty(data?.eyesight)) {
            set.eyesight = data.eyesight;
        }
        if (data?.isHepatitis === true || data?.isHepatitis === false) {
            set.isHepatitis = data.isHepatitis;
        }
        if (!isEmpty(data?.isTattoo)) {
            set.isTattoo = data.isTattoo;
        }
        if (!isEmpty(data?.otherRequirement)) {
            set.otherRequirement = data.otherRequirement;
        }
        if (!isEmpty(data?.examForm)) {
            set.examForm = data.examForm;
        }
        if (!isEmpty(data?.examDate)) {
            set.examDate = data.examDate;
        }
        if (!isEmpty(data?.expiredDate)) {
            set.expiredDate = data.expiredDate;
        }
        if (!isEmpty(data?.exportDate)) {
            set.exportDate = data.exportDate;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (isNumber(data?.exportFee)) {
            set.exportFee = data.exportFee;
        }
        if (!isEmpty(data?.workmanship)) {
            set.workmanship = data.workmanship;
        }
        if (!isEmpty(data?.detailImages)) {
            set.detailImages = data.detailImages;
        }
        if (!isEmpty(data?.currency)) {
            set.currency = data.currency;
        }
        if (isNumber(data?.allApplyUsers)) {
            set.allApplyUsers = data.allApplyUsers;
        }
        // set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        set.updatedAt = generatorTime();
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
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
        if (data?.status) {
            set.status = data.status;
        }
        if (data?.reason) {
            set.reason = data.reason;
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
        if (!isEmpty(data?.trackingBusinessObjId) || data?.trackingBusinessObjId === null) {
            set.trackingBusinessObjId = data?.trackingBusinessObjId;
        }
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const listInternal = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
            postType: POST_TYPE[100],
        };
        if (data?.userObjId) {
            conditions.createdBy = convertToObjectId(data.userObjId);
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { title: search },
                { jobObjId: search },
            ]
        }
        if (data?.examPlace) {
            conditions.examPlace = trimValue(data.examPlace);
        }
        const populate = [
            populateModel('createdBy', 'email _id '),
        ];
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

        const result = await PostsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateInternal = async (data) => {
    try {
        const conditions = {};
        if (data?.postObjId) {
            conditions._id = convertToObjectId(data.postObjId);
        }
        const set = {};
        if (!isEmpty(data?.title)) {
            set.title = data.title;
        }
        if (!isEmpty(data?.companyObjId)) {
            set.companyObjId = data.companyObjId;
        }
        if (!isEmpty(data?.jobObjId)) {
            set.jobObjId = data.jobObjId;
        }
        if (!isEmpty(data?.jobDescription)) {
            set.jobDescription = data.jobDescription;
        }
        if (!isEmpty(data?.image)) {
            set.image = data.image;
        }
        if (!isEmpty(data?.examPlace)) {
            set.examPlace = data.examPlace;
        }
        if (!isEmpty(data?.workingTime)) {
            set.workingTime = data.workingTime;
        }
        if (!isNumber(data?.salary)) {
            set.salary = data.salary;
        }
        if (!isEmpty(data?.benefit)) {
            set.benefit = data.benefit;
        }
        if (!isNumber(data?.numberOfRecruits)) {
            set.numberOfRecruits = data.numberOfRecruits;
        }
        if (!isEmpty(data?.expiredDate)) {
            set.expiredDate = data.expiredDate;
        }
        if (!isEmpty(data?.companyAddress)) {
            set.companyAddress = data.companyAddress;
        }
        set.isDeleted = IS_DELETED[200];
        set.updatedAt = generatorTime();
        set.updatedBy = convertToObjectId(data.updatedBy);
        const result = await PostsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const topHR = async (data) => {
    try {
        const pipeline = [
            {
                $match: { isDeleted: IS_DELETED[200] }
            },
            {
                $group: {
                    _id: '$createdBy',
                    posts: { $push: '$_id' },
                },
            },
            {
                $addFields: {
                    totalPost: { $size: '$posts' }
                }
            },
            {
                $sort: { totalPost: -1 }
            },
            { $lookup: lookupAggregate('users', '_id', '_id', 'createdBy') },
            { $unwind: unwindAggregate('$createdBy') },
            {
                $project: {
                    '_id': 1,
                    'createdBy.fullName': 1,
                    'totalPost': 1
                }
            },
            {
                $limit: 6
            }
        ]
        const result = await PostsModels.aggregate(pipeline);
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
    list,
    updateDelete,
    updateStatus,
    approve,
    inactive,
    listAggregate,
    listVIP,
    createExternal,
    listInternal,
    updateInternal,
    topHR,
};
