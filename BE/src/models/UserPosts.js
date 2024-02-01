const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');

const UserPostsBase = {
    userObjId: {
        type: ObjectId, default: null, require: true, ref: 'users',
    },
    postObjId: {
        type: ObjectId, default: null, require: true, ref: 'posts',
    },
}
const UserPosts = { ...UserPostsBase, ...common };
const UserPostsSchema = new Schema(UserPosts, { versionKey: false });
UserPostsSchema.index({
  userObjId: 1, postObjId: 1, isDeleted: 1,
}, {
  unique: true,
  partialFilterExpression: {
      isDeleted: { $eq: 'No' },
  },
});
const UserPostsModels = mongoose.model('user_posts', UserPostsSchema);
module.exports = UserPostsModels;