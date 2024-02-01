const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const { TYPE_USER, GENDER, STATUS_USER, CANDIDATE_TYPE, CANDIDATE_GROUP } = require('../utils/constants');
const { common } = require('./Common');
const mongoosePaginate = require('mongoose-paginate-v2');
const CANDIDATE_TYPE_ENUM = Object.values(CANDIDATE_TYPE);
const CANDIDATE_GROUP_ENUM = Object.values(CANDIDATE_GROUP);
const usersBase = {
    email: {
        type: String, trim: true,
    },
    phoneNumber: {
        type: String, trim: true,
    },
    password: {
        type: String, trim: true,
    },
    expiresDate: {
        type: String, trim: true, default: null
    },
    verifyCode: {
        type: String, trim: true, default: '',
    },
    type: {
        type: String, enum: TYPE_USER, default: TYPE_USER[1],
    },
    fullName: {
        type: String, trim: true, default: '',
    },
    statusUser: {
        type: String, enum: STATUS_USER, default: STATUS_USER[1],
    },
    expireTruth: {
        type: String, default: '',
    },
    gender: {
        type: String, enum: GENDER, default: GENDER[0],
    },
    avatar: {
        type: String, trim: true, default: '',
    },
    dob: { // date of birth
        type: String, trim: true, default: '',
    },
    zalo: {
        type: String, trim: true, default: '',
    },
    fb: {
        type: String, trim: true, default: '',
    },
    address: {
        type: String, trim: true, default: '',
    },
    countryObjId: {
        type: ObjectId, trim: true, ref: "countries", default: null,
    },
    districtObjId: {
        type: String, trim: true, default: '',
    },
    cityObjId: {
        type: ObjectId, trim: true, ref: "cities", default: null,
    },
    weight: {
        type: Number, trim: true, default: '',
    },
    height: {
        type: Number, trim: true, default: '',
    },
    diseaseHistory: {
        type: Boolean, default: false,
    },
    isTattoo: {
        type: Boolean, default: false,
    },
    isSmoking: {
        type: Boolean, default: false,
    },
    isGeneticDisease: { // bệnh di truyền
        type: Boolean, default: false,
    },
    isHepatitis: {
        type: Boolean, default: false,
    },
    languages: [
        { type: String, default: '' },
    ],
    education: {
        type: String, default: '',
    },
    availableFund: {
        type: Number, default: 0,
    },
    eyeSight: {
        type: Number, trim: true, default: '',
    },
    isDiploma: { // bằng nghề
        type: Boolean, default: false,
    },
    description: { // giới thiệu
        type: String, default: '',
    },
    changePWCode: {
        type: String, default: null,
    },
    lastModifiedPW: {
        type: String, default: null,
    },
    trackingBusinessObjId: {
        type: ObjectId, ref: 'tracking_businesses', default: null,
    },
    candidateType: {
        type: String, enum: CANDIDATE_TYPE_ENUM, default: CANDIDATE_TYPE[100],
    },
    candidateGroup: {
        type: String, enum: CANDIDATE_GROUP_ENUM, default: CANDIDATE_GROUP[100],
    },
    laborExportJob: { // kinh nghiệm công việc xkld
      type: String, default: '',
    },
    laborExportExp: { // kinh nghiệm xkld
      type: String, default: '',
    },
}
const users = { ...usersBase, ...common };
const UsersSchema = new Schema(users, { versionKey: false });
UsersSchema.plugin(mongoosePaginate);
const UsersModels = mongoose.model('users', UsersSchema);

module.exports = UsersModels;