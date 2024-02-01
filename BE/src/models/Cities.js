const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const CitiesBase = {
  cityName: { type: String, required: true },
  countryObjId: {
    type: ObjectId, ref: 'countries', required: true
  }
}
const Cities = { ...CitiesBase, ...common };
const CitiesSchema = new Schema(Cities, { versionKey: false });

const CitiesModels = mongoose.model('cities', CitiesSchema);
module.exports = CitiesModels;