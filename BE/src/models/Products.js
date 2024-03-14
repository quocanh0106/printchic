const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { common } = require('./Common');
const ProductsBase = {
    metaDescriptionUK: {
        type: String, trim: true,
    },
    metaDescriptionUS: {
        type: String, trim: true,
    },
    metaDescriptionFR: {
        type: String, trim: true,
    },
    metaDescriptionDE: {
        type: String, trim: true,
    },
    handleUrlUK: {
        type: String, trim: true,
    },
    handleUrlUS: {
        type: String, trim: true,
    },
    handleUrlFR: {
        type: String, trim: true,
    },
    handleUrlDE: {
        type: String, trim: true,
    },
    typeUK: {
        type: String, trim: true,
    },
    typeUS: {
        type: String, trim: true,
    },
    typeFR: {
        type: String, trim: true,
    },
    typeDE: {
        type: String, trim: true,
    },
    titleUS: {
        type: String, trim: true,
    },
    titleUK: {
        type: String, trim: true,
    },
    titleFR: {
        type: String, trim: true,
    },
    titleDE: {
        type: String, trim: true,
    },
    categoryProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category_product'
    }],
    languageId: {
        type: ObjectId, trim: true, ref: 'languages',
    },
    descriptionUK: {
        type: String, trim: true,
    },
    descriptionUS: {
        type: String, trim: true,
    },
    descriptionFR: {
        type: String, trim: true,
    },
    descriptionDE: {
        type: String, trim: true,
    },
    media: {
        type: Array, trim: true,
    },
    variants: {
        type: Array, trim: true,
    },
    currency: {
        type: String, trim: true,
    },
    status: {
        type: Number, trim: true,
    },
    price: {
        type: Number, trim: true,
    },
    priceSale: {
        type: Number, trim: true,
    },
    customizationOptions: {
        type: String, trim: true,
    },
    detailProduct: {
        type: String, trim: true,
    },
    valueMaterial_1: {
        type: String, trim: true,
    },
    valueMaterial_2: {
        type: String, trim: true,
    },
    featureProduct: {
        type: String, trim: true,
    },
    optionMaterial_1: {
        type: String, trim: true,
    },
    minName_1: {
        type: String, trim: true,
    },
    maxName_1: {
        type: String, trim: true,
    },
    optionMaterial_2: {
        type: String, trim: true,
    },
    minName_2: {
        type: String, trim: true,
    },
    maxName_2: {
        type: String, trim: true,
    },

    tabProductDetailUS: {
        type: String, trim: true,
    },
    tabProductDetailUK: {
        type: String, trim: true,
    },
    tabProductDetailFR: {
        type: String, trim: true,
    },
    tabProductDetailDE: {
        type: String, trim: true,
    },

    tabSizeGuideUS: {
        type: String, trim: true,
    },
    tabSizeGuideUK: {
        type: String, trim: true,
    },
    tabSizeGuideFR: {
        type: String, trim: true,
    },
    tabSizeGuideDE: {
        type: String, trim: true,
    },

    tabMockupTemplateUS: {
        type: String, trim: true,
    },
    tabMockupTemplateUK: {
        type: String, trim: true,
    },
    tabMockupTemplateFR: {
        type: String, trim: true,
    },
    tabMockupTemplateDE: {
        type: String, trim: true,
    },

    tabCareInstructionUS: {
        type: String, trim: true,
    },
    tabCareInstructionUK: {
        type: String, trim: true,
    },
    tabCareInstructionFR: {
        type: String, trim: true,
    },
    tabCareInstructionDE: {
        type: String, trim: true,
    },
    btnLink: {
        type: String, trim: true,
    }

}
const Products = { ...ProductsBase, ...common };
const ProductsSchema = new Schema(Products, { versionKey: false });
ProductsSchema.plugin(mongoosePaginate);

const ProductsModels = mongoose.model('products', ProductsSchema);
module.exports = ProductsModels;