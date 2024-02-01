const {
    user_posts: UserPostsModels,
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
        set.userObjId = convertToObjectId(data.userObjId);
        set.postObjId = convertToObjectId(data.postObjId);
        set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
        set.createdAt = generatorTime();
        set.createdBy = convertToObjectId(data.createdBy);
        const result = await UserPostsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, limit = 10 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        if (data?.postObjId) {
            conditions.postObjId = convertToObjectId(data.postObjId);
        }
        const pipeline = [
            { $match: conditions },
            { $lookup: lookupAggregate('users', 'userObjId', '_id', 'userObjId') },
            { $unwind: unwindAggregate('$userObjId') },
            { $lookup: lookupAggregate('posts', 'postObjId', '_id', 'postObjId') },
            { $unwind: unwindAggregate('$postObjId') },
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { [sortKey]: +sortOrder }),
        });
        const result = await UserPostsModels.aggregate(pipeline);
        return promiseResolve(
            convertResultAggregatePagination(result, currentPage, limit),
        );
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const listCandidateByUser = async (data) => {
    try {
        const { sortKey = "createdAt", sortOrder = -1, limit = 10 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const mergePipeline = [];
        if (data?.userObjId) {
            mergePipeline.push({
                $match: { 'postObjId.createdBy': convertToObjectId(data.userObjId) }
            })
        }
        if (data?.postObjId) {
            conditions.postObjId = convertToObjectId(data.postObjId);
        }
        if (data?.gender) {
            mergePipeline.push({
                $match: { 'userObjId.gender': data.gender }
            })
        }
        const pipeline = [
            { $match: conditions },
            { $lookup: lookupAggregate('users', 'userObjId', '_id', 'userObjId') },
            { $unwind: unwindAggregate('$userObjId') },
            { $lookup: lookupAggregate('countries', 'userObjId.countryObjId', '_id', 'userObjId.countryObjId') },
            { $unwind: unwindAggregate('$userObjId.countryObjId') },
            { $lookup: lookupAggregate('cities', 'userObjId.cityObjId', '_id', 'userObjId.cityObjId') },
            { $unwind: unwindAggregate('$userObjId.cityObjId') },
            { $lookup: lookupAggregate('posts', 'postObjId', '_id', 'postObjId') },
            { $unwind: unwindAggregate('$postObjId') },
            {
                $project: {
                    'userObjId.password': 0,
                    'userObjId.phoneNumber': 0,
                    'userObjId.verifyCode': 0,
                    'userObjId.type': 0,
                    'userObjId.statusUser': 0,
                    'userObjId.zalo': 0,
                    'userObjId.fb': 0,
                    'userObjId.availableFund': 0,
                    'userObjId.trackingBusinessObjId': 0,
                    'userObjId.lastModifiedPW': 0,
                }
            },
            ...mergePipeline,
        ]
        const currentPage = +data.page || 1;
        const skip = (currentPage - 1) * +limit;
        pipeline.push({
            $facet: facetPaginationAggregate(currentPage, limit, skip, { [sortKey]: +sortOrder }),
        });
        const result = await UserPostsModels.aggregate(pipeline);
        return promiseResolve(
            convertResultAggregatePagination(result, currentPage, limit),
        );
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
        };
        if (data?.postObjId) {
            conditions.postObjId = convertToObjectId(data.postObjId);
        }
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        if (isEmpty(conditions)) {
            return promiseResolve(null);
        }
        conditions.isDeleted = IS_DELETED[200];
        const populate = [
            populateModel('userObjId', '-password'),
        ]
        if (data?.getAll) {
            const result = await UserPostsModels.find(conditions).populate(populate);
            return promiseResolve(result);
        }
        const result = await UserPostsModels.findOne(conditions).populate(populate);
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
        if (!isEmpty(data?.healthCondition)) {
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
        // set.status = STATUS[100];
        set.isDeleted = IS_DELETED[200];
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
    updateConditions,
    findLatestOrder,
    list,
    updateDelete,
    updateStatus,
    approve,
    inactive,
    listCandidateByUser,
};
