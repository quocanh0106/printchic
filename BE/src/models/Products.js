const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ProductsBase = {
    handleUrl: {
        type: String, trim: true,
    },
    categoryProductTd: {
        type: ObjectId, trim: true, ref: 'category_product',
    },
    languageId: {
        type: ObjectId, trim: true, ref: 'languages',
    },
    metaDescription: {
        type: String, trim: true,
    },
    type: {
        type: String, trim: true,
    },
    description: {
        type: String, trim: true,
    },
    sku: {
        type: String, trim: true,
    },
    price: {
        type: String, trim: true,
    },
    media: {
        type: Array, trim: true,
    },
    options: {
        type: Array, trim: true,
    },
    variants: {
        type: Array, trim: true,
    },
    buttonLink: {
        type: String, trim: true,
    },
    status: {
        type: Number, trim: true,
    },
}
const Products = { ...ProductsBase, ...common };
const ProductsSchema = new Schema(Products, { versionKey: false });
ProductsSchema.plugin(mongoosePaginate);

const ProductsModels = mongoose.model('products', ProductsSchema);
module.exports = ProductsModels;