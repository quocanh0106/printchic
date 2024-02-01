const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const { CONFIG_TYPE, CONFIG_EXPIRED_UNIT, YES_NO } = require('../utils/constants');
const CONFIG_TYPE_ENUM = Object.values(CONFIG_TYPE);
const CONFIG_EXPIRED_UNIT_ENUM = Object.values(CONFIG_EXPIRED_UNIT);
const YES_NO_ENUM = Object.values(YES_NO);
const ConfigsBase = {
  configCode: { type: String, required: true, unique: true },
  configName: {
    type: String, trim: true, sparse: true,
  },
  value: { // price
    type: Number,
  },
  unit: {
    type: String, trim: true, sparse: true,
  },
  level: {
    type: Number, default: 255,
  },
  detail: {

  },
  type: {
    type: String, enum: CONFIG_TYPE_ENUM, default: CONFIG_TYPE[100],
  },
  expired: {
    value: {
      type: Number,
    },
    unit: {
      type: String, enum: CONFIG_EXPIRED_UNIT_ENUM, default: CONFIG_EXPIRED_UNIT[100],
    }
  },
  canUpdate: {
    type: String, enum: YES_NO_ENUM, default: YES_NO[100],
  }
}
const Configs = { ...ConfigsBase, ...common };
const ConfigsSchema = new Schema(Configs, { versionKey: false });
ConfigsSchema.plugin(mongoosePaginate);

const ConfigsModels = mongoose.model('configs', ConfigsSchema);
module.exports = ConfigsModels;