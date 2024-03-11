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
  imageFeature: {
    type: String, trim: true,
  },
  siteName: {
    type: String, trim: true,
  },
  metaTitle: {
    type: String, trim: true,
  },
  metaDescription: {
    type: String, trim: true,
  },
  headTag: {
    type: String, trim: true,
  },
  footerTag: {
    type: String, trim: true,
  },
  headEmbedAll: {
    type: String, trim: true,
  },
  headTagAll: {
    type: String, trim: true,
  },
  footerTagAll: {
    type: String, trim: true,
  },
  language: {
    type: String, trim: true,
  },

  processingTimeUK: {
    type: String, trim: true,
  },
  processingTimeUS: {
    type: String, trim: true,
  },
  processingTimeFR: {
    type: String, trim: true,
  },
  processingTimeDE: {
    type: String, trim: true,
  },

  shippingTimeUK: {
    type: String, trim: true,
  },
  shippingTimeUS: {
    type: String, trim: true,
  },
  shippingTimeFR: {
    type: String, trim: true,
  },
  shippingTimeDE: {
    type: String, trim: true,
  },

  templateProductUK: {
    type: String, trim: true,
  },
  templateProductUS: {
    type: String, trim: true,
  },
  templateProductFR: {
    type: String, trim: true,
  },
  templateProductDE: {
    type: String, trim: true,
  },

}
const setting = { ...settingBase, ...common };
const SettingSchema = new Schema(setting, { versionKey: false });
SettingSchema.plugin(mongoosePaginate);

const SettingModels = mongoose.model('settings', SettingSchema);
module.exports = SettingModels;