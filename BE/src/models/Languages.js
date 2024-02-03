const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { common } = require('./Common');
const LanguagesBase = {
    vn: {
        type: String, trim: true,
    },
    fr: {
        type: String, trim: true,
    },
    en_us: {
        type: String, trim: true,
    },
    en_uk: {
        type: String, trim: true,
    },
}
const languages = { ...LanguagesBase, ...common };
const LanguagesSchema = new Schema(languages, { versionKey: false });
const LanguagesModels = mongoose.model('languages', LanguagesSchema);
module.exports = LanguagesModels;