const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const { common } = require('./Common');
const XKLDCompaniesBase = {
  companyName: { type: String, unique: true },
  companyCode: { type: String, },
  phoneNumber: { type: String, },
  address: { type: String, },
  status: { type: String, },
}
const XKLDCompanies = { ...XKLDCompaniesBase, ...common };
const XKLDCompaniesSchema = new Schema(XKLDCompanies, { versionKey: false });

XKLDCompaniesSchema.plugin(mongoosePaginate);
const XKLDCompaniesModels = mongoose.model('xkld_companies', XKLDCompaniesSchema);

module.exports = XKLDCompaniesModels;