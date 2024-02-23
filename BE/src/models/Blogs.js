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
  title: {
    type: String, trim: true,
  },
  status: {
    type: String, trim: true,
  },
  img: {
    type: String, trim: true,
  },
  content: {
    type: Array, trim: true,
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