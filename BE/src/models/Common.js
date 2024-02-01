
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const {
    IS_DELETED, STATUS,
} = require('../utils/constants');
const {
    generatorTime,
} = require('../utils/shared');

const common = {
    isDeleted: { type: String, default: IS_DELETED[200], index: true },
    createdAt: { type: String, required: true, default: generatorTime },
    updatedAt: { type: String, default: null },
    updatedBy: { type: ObjectId, default: null, ref: 'users' },
    createdBy: { type: ObjectId, default: null, ref: 'users' },
    status: { type: String, default: STATUS[100] }
};
module.exports = {
    common,
};
