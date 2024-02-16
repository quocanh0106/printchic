const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');

const UserPostsBase = {
  languageId: {
    type: ObjectId, default: null, require: true, ref: 'languages',
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
  bannerImg: {
    type: String, trim: true,
  },
  description: {
    type: String, trim: true,
  },
}
const UserPosts = { ...UserPostsBase, ...common };
const CategoryBlogSchema = new Schema(UserPosts, { versionKey: false });
CategoryBlogSchema.plugin(mongoosePaginate);

const CategoryBlogsModels = mongoose.model('category_blog', CategoryBlogSchema);
module.exports = CategoryBlogsModels;