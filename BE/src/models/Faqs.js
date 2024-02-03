const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;

const faqsBase = {
    languageId: {
        type: ObjectId, default: null, require: true, ref: 'languages',
    },
    blogId: {
        type: ObjectId, default: null, require: true, ref: 'languages',
    },
    question: {
        type: String, trim: true,
    },
    answer: {
        type: String, trim: true,
    },
}
const faqs = { ...faqsBase, ...common };
const FaqsSchema = new Schema(faqs, { versionKey: false });
const FaqsModels = mongoose.model('faqs', FaqsSchema);
module.exports = FaqsModels;