const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ConfigsBase = {
  languageId: {
    type: ObjectId, default: null, require: false, ref: 'languages',
  },
  title: {
    type: String, trim: true,
  },
  description: {
    type: String, trim: true,
  },
  bannerImg: {
    type: String, trim: true,
  },
  parentCategory: {
    type: String, trim: true,
  },
}
const Configs = { ...ConfigsBase, ...common };
const ConfigsSchema = new Schema(Configs, { versionKey: false });
ConfigsSchema.plugin(mongoosePaginate);

const CategoryProductModels = mongoose.model('category_product', ConfigsSchema);
module.exports = CategoryProductModels;