const {
    verifies: VerifiesModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject,
} = require('../utils/shared');
const { IS_DELETED } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.verifyCode = data.verifyCode;
        set.isDeleted = IS_DELETED[200];
        const result = await VerifiesModels.create(set);
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
        if (data?.verifyObjId) {
            conditions._id = convertToObjectId(data?.verifyObjId);
        }
        const result = await VerifiesModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
};
