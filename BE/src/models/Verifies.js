const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { common } = require('./Common');
const verifiesBase = {
    verifyCode: {
        type: String, trim: true, default: '',
    },
}
const verifies = { ...verifiesBase, ...common };
const VerifiesSchema = new Schema(verifies, { versionKey: false });
const VerifiesModels = mongoose.model('verifies', VerifiesSchema);
module.exports = VerifiesModels;