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
  handleUrl: {
    type: String, trim: true,
  },
  metaDescription: {
    type: String, trim: true,
  },
  title: {
    type: String, trim: true,
  },
  thumbImg: {
    type: String, trim: true,
  },
  bannerImg: {
    type: String, trim: true,
  },
  content: {
    type: String, trim: true,
  },
  tags: {
    type: Array,
  },
  recommend: {
    type: Array,
  },
}
const Blogs = { ...blogBase, ...common };
const BlogsSchema = new Schema(Blogs, { versionKey: false });
BlogsSchema.plugin(mongoosePaginate);

const BlogsModels = mongoose.model('blogs', BlogsSchema);
module.exports = BlogsModels;