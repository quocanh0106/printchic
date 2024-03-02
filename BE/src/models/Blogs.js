const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const blogBase = {
  languageId: {
    type: ObjectId, default: null, require: true, ref: 'languages',
  },
  categoryBlogId: {
    type: ObjectId, default: null, require: true, ref: 'category_blog',
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
  status: {
    type: String, trim: true,
  },
  img: {
    type: String, trim: true,
  },
  contentUK: {
    type: String, trim: true,
  },
  contentUS: {
    type: String, trim: true,
  },
  contentDE: {
    type: String, trim: true,
  },
  contentFR: {
    type: String, trim: true,
  },
  tags: {
    type: String,
  },
  recommendProduct: {
    type: Array,
  },
}
const Blogs = { ...blogBase, ...common };
const BlogsSchema = new Schema(Blogs, { versionKey: false });
BlogsSchema.plugin(mongoosePaginate);

const BlogsModels = mongoose.model('blogs', BlogsSchema);
module.exports = BlogsModels;