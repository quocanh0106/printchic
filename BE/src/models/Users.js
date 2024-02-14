const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { common } = require('./Common');
const mongoosePaginate = require('mongoose-paginate-v2');
const usersBase = {
    name: {
        type: String, trim: true,
    },
    email: {
        type: String, trim: true,
    },
    role: {
        type: String, trim: true,
    },
    password: {
        type: String, trim: true,
    }
}
const users = { ...usersBase, ...common };
const UsersSchema = new Schema(users, { versionKey: false });
UsersSchema.plugin(mongoosePaginate);
const UsersModels = mongoose.model('users', UsersSchema);

module.exports = UsersModels;