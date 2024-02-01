const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');

const attachmentsBase = {
    name: { type: String, required: true },
    link: { type: String, required: true, trim: true },
    type: { type: String },
    size: { type: Number, default: 0 },
    note: { type: String },
}
const attachments = { ...attachmentsBase, ...common };
const AttachmentsSchema = new Schema(attachments, { versionKey: false });
const AttachmentsModels = mongoose.model('attachments', AttachmentsSchema);
module.exports = AttachmentsModels;