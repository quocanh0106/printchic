const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const settingBase = {
  userId: {
    type: ObjectId, default: null, require: true, ref: 'users',
  },
  languageId: {
    type: ObjectId, default: null, require: true, ref: 'languages',
  },
  language: {
    type: String, trim: true,
  },
}
const setting = { ...settingBase, ...common };
const SettingSchema = new Schema(setting, { versionKey: false });
SettingSchema.plugin(mongoosePaginate);

const SettingModels = mongoose.model('settings', SettingSchema);
module.exports = SettingModels;