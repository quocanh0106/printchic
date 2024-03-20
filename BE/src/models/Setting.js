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
  siteNameUK: {
    type: String, trim: true,
  },
  siteNameUS: {
    type: String, trim: true,
  },
  siteNameFR: {
    type: String, trim: true,
  },
  siteNameDE: {
    type: String, trim: true,
  },
  metaTitleUK: {
    type: String, trim: true,
  },
  metaTitleUS: {
    type: String, trim: true,
  },
  metaTitleFR: {
    type: String, trim: true,
  },
  metaTitleDE: {
    type: String, trim: true,
  },
  metaDescriptionUK: {
    type: String, trim: true,
  },
  metaDescriptionUS: {
    type: String, trim: true,
  },
  metaDescriptionFR: {
    type: String, trim: true,
  },
  metaDescriptionDE: {
    type: String, trim: true,
  },
  headTagUK: {
    type: String, trim: true,
  },
  headTagUS: {
    type: String, trim: true,
  },
  headTagFR: {
    type: String, trim: true,
  },
  headTagDE: {
    type: String, trim: true,
  },
  footerTagUK: {
    type: String, trim: true,
  },
  footerTagUS: {
    type: String, trim: true,
  },
  footerTagFR: {
    type: String, trim: true,
  },
  footerTagDE: {
    type: String, trim: true,
  },
  headEmbedAllUK: {
    type: String, trim: true,
  },
  headEmbedAllUS: {
    type: String, trim: true,
  },
  headEmbedAllFR: {
    type: String, trim: true,
  },
  headEmbedAllDE: {
    type: String, trim: true,
  },
  headTagAllUK: {
    type: String, trim: true,
  },
  headTagAllUS: {
    type: String, trim: true,
  },
  headTagAllFR: {
    type: String, trim: true,
  },
  headTagAllDE: {
    type: String, trim: true,
  },
  footerTagAllUK: {
    type: String, trim: true,
  },
  footerTagAllUS: {
    type: String, trim: true,
  },
  footerTagAllFR: {
    type: String, trim: true,
  },
  footerTagAllDE: {
    type: String, trim: true,
  },
  language: {
    type: String, trim: true,
  }

}
const setting = { ...settingBase, ...common };
const SettingSchema = new Schema(setting, { versionKey: false });
SettingSchema.plugin(mongoosePaginate);

const SettingModels = mongoose.model('settings', SettingSchema);
module.exports = SettingModels;