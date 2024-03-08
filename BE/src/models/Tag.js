const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { common } = require('./Common');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Types.ObjectId;

const tagBase = {
    titleUK: {
        type: String, trim: true,
    },
    titleUS: {
        type: String, trim: true,
    },
    titleFR: {
        type: String, trim: true,
    },
    titleDE: {
        type: String, trim: true,
    },
}
const tags = { ...tagBase, ...common };
const TagSchema = new Schema(tags, { versionKey: false });
TagSchema.plugin(mongoosePaginate);

const TagModels = mongoose.model('tags', TagSchema);
module.exports = TagModels;