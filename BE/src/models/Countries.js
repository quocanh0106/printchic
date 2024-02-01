const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const mongoosePaginate = require('mongoose-paginate-v2');

const CountriesBase = {
  countryName: { type: String, required: true, unique: true },
  logo: { type: String, default: null },
}
const Countries = { ...CountriesBase, ...common };
const CountriesSchema = new Schema(Countries, { versionKey: false });
CountriesSchema.plugin(mongoosePaginate);

const CountriesModels = mongoose.model('countries', CountriesSchema);
module.exports = CountriesModels;