const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');

const { GENDER_FOR_WORK, STATUS_POST, POST_TYPE } = require('../utils/constants');
const STATUS_POST_ENUM = Object.values(STATUS_POST);
const POST_TYPE_ENUM = Object.values(POST_TYPE);
const postsBase = {
    title: {
        type: String, trim: true, required: true, index: true,
    },
    countryObjId: {
        type: ObjectId, trim: true, ref: 'countries', default: null,
    },
    provinceObjId: {
        type: ObjectId, trim: true, ref: 'cities', default: null,
    },
    companyObjId: {
        type: String, trim: true, default: '', index: true,
    },
    companyLogo: {
        type: String, trim: true, default: '',
    },
    jobObjId: {
        type: String, trim: true, default: '',
    },
    jobDescription: {
        type: String, trim: true, default: '',
    },
    image: {
        type: String, trim: true, default: '',
    },
    examPlace: {
        type: String, trim: true, default: '',
    },
    workingTime: {
        type: String, trim: true, default: '',
    },
    salary: {
        type: String, trim: true, default: '',
    },
    expectedIncome: {
        type: String, trim: true, default: '',
    },
    isOverTime: { // Có làm thêm hay không
        type: Boolean, trim: true, default: false,
    },
    benefit: { // Các quyền lợi
        type: String, trim: true, default: '',
    },
    numberOfRecruits: {
        type: Number, trim: true, default: 0,
    },
    contractObjId: { // hợp đồng
        type: String, trim: true, default: '',
    },
    exportFee: { // phí xuất cảnh
        type: String, trim: true, default: '',
    },
    gender: {
        type: String, enum: GENDER_FOR_WORK, default: GENDER_FOR_WORK[0],
    },
    fromBorn: {
        type: String, trim: true, default: '',
    },
    endBorn: {
        type: String, trim: true, default: '',
    },
    education: {
        type: String, trim: true, default: '',
    },
    languages: [{
        type: String, trim: true, default: '',
    }],
    experiences: [{
        type: String, trim: true, default: '',
    }],
    healthCondition: {
        type: Boolean, trim: true, default: true,
    },
    eyesight: {
        type: String, trim: true, default: '',
    },
    isHepatitis: {
        type: Boolean, default: false,
    },
    isTattoo: {
        type: Boolean, default: false,
    },
    otherRequirement: [{
        type: String, trim: true, default: '',
    }],
    examForm: {
        type: String, trim: true, default: '',
    },
    examDate: {
        type: String, trim: true, default: '',
    },
    expiredDate: {
        type: String, trim: true, default: null,
    },
    exportDate: {
        type: String, trim: true, default: '',
    },
    description: {
        type: String, trim: true, default: '',
    },
    postStatus: {
        type: String, enum: STATUS_POST_ENUM, default: STATUS_POST[100],
    },
    expiredUpgradePost: {
        type: String, trim: true, default: '',
    },
    reason: {
        type: String, trim: true, default: '',
    },
    detailImages: [
        { type: String, trim: true, default: '', }
    ],
    workmanship: {
        type: String, trim: true, default: '',
    },
    currency: {
        type: String, trim: true, default: 'VND'
    },
    allApplyUsers: {
        type: Number, default: 0,
    },
    trackingBusinessObjId: {
        type: ObjectId, ref: 'tracking_businesses', default: null,
    },
    configObjId: {
        type: ObjectId, ref: 'configs', default: null,
    },
    postType: {
        type: String, enum: POST_TYPE_ENUM, default: POST_TYPE[200],
    },
    companyAddress: {
        type: String, trim: true, default: ''
    },
    postId: {
        type: Number, default: 0,
    },
}
const posts = { ...postsBase, ...common };
const PostsSchema = new Schema(posts, { versionKey: false });
PostsSchema.plugin(mongoosePaginate);

const PostsModels = mongoose.model('posts', PostsSchema);
module.exports = PostsModels;