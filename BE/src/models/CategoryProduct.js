const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ConfigsBase = {
  languageId: {
    type: ObjectId, default: null, require: false, ref: 'languages',
  },
  titleUK: {
    type: String, trim: true,
  },
  titleUS: {
    type: String, trim: true,
  },
  titleDE: {
    type: String, trim: true,
  },
  titleFR: {
    type: String, trim: true,
  },
  descriptionUK: {
    type: String, trim: true,
  },
  descriptionUS: {
    type: String, trim: true,
  },
  descriptionDE: {
    type: String, trim: true,
  },
  descriptionFR: {
    type: String, trim: true,
  },
  handleUrlUK: {
    type: String, trim: true,
  },
  handleUrlUS: {
    type: String, trim: true,
  },
  handleUrlDE: {
    type: String, trim: true,
  },
  handleUrlFR: {
    type: String, trim: true,
  },
  bannerImg: {
    type: String, trim: true,
  },
  pajamasUK: {
    type: String, trim: true,
  },
  pajamasUS: {
    type: String, trim: true,
  },
  pajamasFR: {
    type: String, trim: true,
  },
  pajamasDE: {
    type: String, trim: true,
  },
  paragraphUK: {
    type: String, trim: true,
  },
  paragraphUS: {
    type: String, trim: true,
  },
  paragraphFR: {
    type: String, trim: true,
  },
  paragraphDE: {
    type: String, trim: true,
  },
  breadcrumbUK: {
    type: String, trim: true,
  },
  breadcrumbUS: {
    type: String, trim: true,
  },
  breadcrumbFR: {
    type: String, trim: true,
  },
  breadcrumbDE: {
    type: String, trim: true,
  },
  childCategory: {
    type: String, trim: true,
  },
  metaTitleUK: {
    type: String, trim: true,
  },
  metaTitleUS: {
    type: String, trim: true,
  },
  metaTitleDE: {
    type: String, trim: true,
  },
  metaTitleFR: {
    type: String, trim: true,
  },
  faq: {
    type: String, trim: true,
  },
  isTop: {
    type: Boolean,
  },
}
const Configs = { ...ConfigsBase, ...common };
const ConfigsSchema = new Schema(Configs, { versionKey: false });
ConfigsSchema.plugin(mongoosePaginate);

const CategoryProductModels = mongoose.model('category_product', ConfigsSchema);
module.exports = CategoryProductModels;