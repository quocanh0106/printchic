const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const { TYPE_CHARGING_HISTORIES_ENUM, TYPE_CHARGING_HISTORIES,
    ENTITY_TYPE_CHARGING_HISTORIES, ENTITY_TYPE_CHARGING_HISTORIES_ENUM } = require('../utils/constants');
const ChargingHistoriesBase = {
    entityObjId: {
        type: ObjectId, default: null, require: true,
    },
    entityType: {
        type: String, default: ENTITY_TYPE_CHARGING_HISTORIES[100], enum: ENTITY_TYPE_CHARGING_HISTORIES_ENUM,
    },
    value: {
        currentStatus: { type: String, trim: true, default: '' },
        updatedStatus: { type: String, trim: true, default: '' },
        price: { type: Number, default: 0 }
    },
    type: {
        type: String, default: TYPE_CHARGING_HISTORIES[100], enum: TYPE_CHARGING_HISTORIES_ENUM,
    },
}
const ChargingHistories = { ...ChargingHistoriesBase, ...common };
const ChargingHistoriesSchema = new Schema(ChargingHistories, { versionKey: false });
const ChargingHistoriesModels = mongoose.model('charging_histories', ChargingHistoriesSchema);
module.exports = ChargingHistoriesModels;