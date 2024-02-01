const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const { common } = require('./Common');
const NewsBase = {
    title: {
        type: String, default: '',
    },
    content: {
        type: String, default: '',
    },
    image: {
        type: String, default: '',
    },
    banner: {
        type: String, default: '',
    },
}
const News = { ...NewsBase, ...common };
const NewsSchema = new Schema(News, { versionKey: false });
NewsSchema.plugin(mongoosePaginate);
const NewsModels = mongoose.model('news', NewsSchema);
module.exports = NewsModels;