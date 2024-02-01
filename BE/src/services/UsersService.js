const {
    users: UsersModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject, trimValue,
    isNumber, isEmpty, generatorTime, regExpSearch, populateModel,
} = require('../utils/shared');
const { IS_DELETED, STATUS, MY_CUSTOM_LABELS, CANDIDATE_GROUP, TYPE_USER } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.password = data.password;
        set.email = data.email;
        set.phoneNumber = data.phoneNumber;
        set.type = data.type;
        set.fullName = trimValue(data.fullName);
        set.isDeleted = IS_DELETED[200];
        set.createdAt = generatorTime();
        const result = await UsersModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateExpiresDate = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            expiresDate: data.expiresDate,
        };
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const { startMonth, endMonth, startPrevMonth, endPrevMonth } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],

        };
        if (data?.email) {
            conditions.$or = [
                { username: data.email },
                { email: data.email },
            ]
            if (data.isRegister) {
                conditions.$or.push({
                    phoneNumber: data.phoneNumber,
                })
            }
        }
        if (data?.type) {
            conditions.type = data.type;
        }
        if (data?.status) {
            conditions.status = data.status;
        }
        if (data?.userObjId) {
            conditions._id = data.userObjId;
        }
        if (data?.statusUsers) {
            conditions.statusUser = { $in: data.statusUsers };
        }
        if (startMonth && endMonth) {
            conditions.createdAt = { $gte: startMonth, $lte: endMonth };
        }
        if (startPrevMonth && endPrevMonth) {
            conditions.createdAt = { $gte: startPrevMonth, $lte: endPrevMonth };
        }
        if (data.isVipUser) {
            conditions.trackingBusinessObjId = { $ne: null };
        }
        const populate = [
            populateModel('countryObjId'),
            populateModel('cityObjId'),
            {
                ...populateModel('trackingBusinessObjId'),
                populate: [
                    populateModel('vipObjId'),
                ]
            }
        ]
        if (data?.getAll) {
            const result = await UsersModels.find(conditions).populate(populate).lean();
            return promiseResolve(result);
        }
        const result = await UsersModels.findOne(conditions).populate(populate).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const set = {};

        if (data?.email) {
            conditions.$or = [
                { username: data.email },
                { email: data.email },
            ]
        }
        if (data?.userObjId) {
            conditions._id = convertToObjectId(data.userObjId);
        }
        if (data?.verifyCode || data?.verifyCode === "") {
            set.verifyCode = data.verifyCode;
        }
        if (data?.password) {
            set.password = data.password;
        }
        if (!isEmpty(data.fullName)) {
            set.fullName = trimValue(data.fullName);
        }
        if (!isEmpty(data.fullName)) {
            set.fullName = trimValue(data.fullName);
        }
        if (!isEmpty(data.gender)) {
            set.gender = trimValue(data.gender);
        }
        if (!isEmpty(data.avatar)) {
            set.avatar = data.avatar;
        }
        if (!isEmpty(data.dob)) {
            set.dob = data.dob;
        }
        if (!isEmpty(data.zalo)) {
            set.zalo = data.zalo;
        }
        if (!isEmpty(data.fb)) {
            set.fb = data.fb;
        }
        if (!isEmpty(data.address)) {
            set.address = data.address;
        }
        if (!isEmpty(data.countryObjId)) {
            set.countryObjId = data.countryObjId;
        }
        if (!isEmpty(data.districtObjId)) {
            set.districtObjId = data.districtObjId;
        }
        if (!isEmpty(data.cityObjId)) {
            set.cityObjId = data.cityObjId;
        }
        if (isNumber(data.weight)) {
            set.weight = data.weight;
        }
        if (isNumber(data.height)) {
            set.height = data.height;
        }
        if (!isEmpty(data.diseaseHistory)) {
            set.diseaseHistory = data.diseaseHistory;
        }
        if (data.isTattoo === 'true' || data.isTattoo === 'false') {
            set.isTattoo = data.isTattoo;
        }
        if (data.isSmoking === 'true' || data.isSmoking === 'false') {
            set.isSmoking = data.isSmoking;
        }
        if (data.isGeneticDisease === 'true' || data.isGeneticDisease === 'false') {
            set.isGeneticDisease = data.isGeneticDisease;
        }
        if (data.isHepatitis === 'true' || data.isHepatitis === 'false') {
            set.isHepatitis = data.isHepatitis;
        }
        if (!isEmpty(data.languages)) {
            set.languages = data.languages;
        }
        if (!isEmpty(data?.education)) {
            set.education = data.education;
        }
        if (!isNumber(data?.eyeSight)) {
            set.eyeSight = data.eyeSight;
        }
        if (data.isDiploma === 'true' || data.isDiploma === 'false') {
            set.isDiploma = data.isDiploma;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (!isEmpty(data?.changePWCode) || data?.changePWCode === '') {
            set.changePWCode = data.changePWCode;
        }
        if (!isEmpty(data?.lastModifiedPW)) {
            set.lastModifiedPW = data.lastModifiedPW;
        }
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const chargeMoney = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            availableFund: +data.availableFund,
        };
        if (data?.statusUser) {
            set.statusUser = data.statusUser;
        }
        if (data?.expireTruth) {
            set.expireTruth = data.expireTruth;
        }
        if (data?.trackingBusinessObjId) {
            set.trackingBusinessObjId = convertToObjectId(data.trackingBusinessObjId);
        }
        if (data?.candidateType) {
            set.candidateType = data.candidateType;
        }
        set.updatedBy = convertToObjectId(data?.updatedBy);
        set.updatedAt = generatorTime();
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true }).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateStatusUser = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            statusUser: data.statusUser,
            expireTruth: data?.expireTruth || '',
        };
        if (!isEmpty(data.trackingBusinessObjId) || data.trackingBusinessObjId === null) {
            set.trackingBusinessObjId = data.trackingBusinessObjId;
        }
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "fullName", sortOrder = 1, page = 1, limit = 10, status } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (status) {
            conditions.status = status;
        }
        if (data?.type) {
            conditions.type = data.type;
        }
        if (data?.gender) {
            conditions.gender = data.gender;
        }
        if (data?.countryObjId) {
            conditions.countryObjId = convertToObjectId(data.countryObjId);
        }
        if (data?.candidateGroup) {
            conditions.candidateGroup = data.candidateGroup;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { email: search },
                { phoneNumber: search },
                { fullName: search },
                { zalo: search },
                { fb: search },
            ]
        }
        const populate = [
            populateModel('countryObjId'),
            populateModel('cityObjId'),
            {
                ...populateModel('trackingBusinessObjId'),
                populate: [
                    populateModel('vipObjId'),
                ]
            }

        ];
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
            populate,
        };
        const result = await UsersModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateStatus = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            status: data.status,
        };
        set.updatedBy = convertToObjectId(data?.updatedBy);
        set.updatedAt = generatorTime();
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true }).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const createInternal = async (data) => {
    try {
        const set = {};
        set.candidateGroup = CANDIDATE_GROUP[200];
        set.email = data.email;
        set.phoneNumber = data.phoneNumber;
        set.type = TYPE_USER[1];
        if (!isEmpty(data.fullName)) {
            set.fullName = trimValue(data.fullName);
        }
        if (!isEmpty(data.gender)) {
            set.gender = trimValue(data.gender);
        }
        if (!isEmpty(data.avatar)) {
            set.avatar = data.avatar;
        }
        if (!isEmpty(data.dob)) {
            set.dob = data.dob;
        }
        if (!isEmpty(data.zalo)) {
            set.zalo = data.zalo;
        }
        if (!isEmpty(data.fb)) {
            set.fb = data.fb;
        }
        if (!isEmpty(data.address)) {
            set.address = data.address;
        }
        if (!isEmpty(data.countryObjId)) {
            set.countryObjId = data.countryObjId;
        }
        if (!isEmpty(data.districtObjId)) {
            set.districtObjId = data.districtObjId;
        }
        if (!isEmpty(data.cityObjId)) {
            set.cityObjId = data.cityObjId;
        }
        if (isNumber(data.weight)) {
            set.weight = data.weight;
        }
        if (isNumber(data.height)) {
            set.height = data.height;
        }
        if (!isEmpty(data.diseaseHistory)) {
            set.diseaseHistory = data.diseaseHistory;
        }
        if (data.isTattoo === true || data.isTattoo === false) {
            set.isTattoo = data.isTattoo;
        }
        if (data.isSmoking === true || data.isSmoking === false) {
            set.isSmoking = data.isSmoking;
        }
        if (data.isGeneticDisease === true || data.isGeneticDisease === false) {
            set.isGeneticDisease = data.isGeneticDisease;
        }
        if (data.isHepatitis === true || data.isHepatitis === false) {
            set.isHepatitis = data.isHepatitis;
        }
        if (!isEmpty(data.languages)) {
            set.languages = data.languages;
        }
        if (!isEmpty(data?.education)) {
            set.education = data.education;
        }
        if (!isNumber(data?.eyeSight)) {
            set.eyeSight = data.eyeSight;
        }
        if (data.isDiploma === true || data.isDiploma === false) {
            set.isDiploma = data.isDiploma;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (!isEmpty(data?.laborExportJob)) {
            set.laborExportJob = data.laborExportJob;
        }
        if (!isEmpty(data?.laborExportExp)) {
            set.laborExportExp = data.laborExportExp;
        }
        const result = await UsersModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateInternal = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: convertToObjectId(data.userObjId),
        }
        console.log(conditions, 'conditions')
        const set = {};
        set.email = data.email;
        set.phoneNumber = data.phoneNumber;
        if (!isEmpty(data.fullName)) {
            set.fullName = trimValue(data.fullName);
        }
        if (!isEmpty(data.gender)) {
            set.gender = trimValue(data.gender);
        }
        if (!isEmpty(data.avatar)) {
            set.avatar = data.avatar;
        }
        if (!isEmpty(data.dob)) {
            set.dob = data.dob;
        }
        if (!isEmpty(data.zalo)) {
            set.zalo = data.zalo;
        }
        if (!isEmpty(data.fb)) {
            set.fb = data.fb;
        }
        if (!isEmpty(data.address)) {
            set.address = data.address;
        }
        if (!isEmpty(data.countryObjId)) {
            set.countryObjId = data.countryObjId;
        }
        if (!isEmpty(data.districtObjId)) {
            set.districtObjId = data.districtObjId;
        }
        if (!isEmpty(data.cityObjId)) {
            set.cityObjId = data.cityObjId;
        }
        if (isNumber(data.weight)) {
            set.weight = data.weight;
        }
        if (isNumber(data.height)) {
            set.height = data.height;
        }
        if (!isEmpty(data.diseaseHistory)) {
            set.diseaseHistory = data.diseaseHistory;
        }
        if (data.isTattoo === true || data.isTattoo === false) {
            set.isTattoo = data.isTattoo;
        }
        if (data.isSmoking === true || data.isSmoking === false) {
            set.isSmoking = data.isSmoking;
        }
        if (data.isGeneticDisease === true || data.isGeneticDisease === false) {
            set.isGeneticDisease = data.isGeneticDisease;
        }
        if (data.isHepatitis === true || data.isHepatitis === false) {
            set.isHepatitis = data.isHepatitis;
        }
        if (!isEmpty(data.languages)) {
            set.languages = data.languages;
        }
        if (!isEmpty(data?.education)) {
            set.education = data.education;
        }
        if (!isNumber(data?.eyeSight)) {
            set.eyeSight = data.eyeSight;
        }
        if (data.isDiploma === true || data.isDiploma === false) {
            set.isDiploma = data.isDiploma;
        }
        if (!isEmpty(data?.description)) {
            set.description = data.description;
        }
        if (!isEmpty(data?.laborExportJob)) {
            set.laborExportJob = data.laborExportJob;
        }
        if (!isEmpty(data?.laborExportExp)) {
            set.laborExportExp = data.laborExportExp;
        }
        console.log(set, 'set')
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const softDelete = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    create,
    findByConditions,
    updateExpiresDate,
    updateConditions,
    chargeMoney,
    updateStatusUser,
    list,
    updateStatus,
    createInternal,
    updateInternal,
    softDelete,
};
