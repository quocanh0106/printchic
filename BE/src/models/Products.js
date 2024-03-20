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
        type: String,
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

    customizationOptionsLabelUK: {
        type: String, trim: true,
    },
    customizationOptionsLabelUS: {
        type: String, trim: true,
    },
    customizationOptionsLabelFR: {
        type: String, trim: true,
    },
    customizationOptionsLabelDE: {
        type: String, trim: true,
    },

    detailProductLabelUK: {
        type: String, trim: true,
    },
    detailProductLabelUS: {
        type: String, trim: true,
    },
    detailProductLabelFR: {
        type: String, trim: true,
    },
    detailProductLabelDE: {
        type: String, trim: true,
    },

    optionMaterialLabelUK: {
        type: String, trim: true,
    },
    optionMaterialLabelUS: {
        type: String, trim: true,
    },
    optionMaterialLabelFR: {
        type: String, trim: true,
    },
    optionMaterialLabelDE: {
        type: String, trim: true,
    },

    featureProductLabelUK: {
        type: String, trim: true,
    },
    featureProductLabelUS: {
        type: String, trim: true,
    },
    featureProductLabelFR: {
        type: String, trim: true,
    },
    featureProductLabelDE: {
        type: String, trim: true,
    },

    customizationOptionsUK: {
        type: String, trim: true,
    },
    customizationOptionsUS: {
        type: String, trim: true,
    },
    customizationOptionsFR: {
        type: String, trim: true,
    },
    customizationOptionsDE: {
        type: String, trim: true,
    },

    detailProductUK: {
        type: String, trim: true,
    },
    detailProductUS: {
        type: String, trim: true,
    },
    detailProductFR: {
        type: String, trim: true,
    },
    detailProductDE: {
        type: String, trim: true,
    },

    valueMaterial_1: {
        type: String, trim: true,
    },

    valueMaterial_2: {
        type: String, trim: true,
    },

    featureProductUK: {
        type: String, trim: true,
    },
    featureProductUS: {
        type: String, trim: true,
    },
    featureProductFR: {
        type: String, trim: true,
    },
    featureProductDE: {
        type: String, trim: true,
    },
    optionMaterial_1UK: {
        type: String, trim: true,
    },
    optionMaterial_1US: {
        type: String, trim: true,
    },
    optionMaterial_1FR: {
        type: String, trim: true,
    },
    optionMaterial_1DE: {
        type: String, trim: true,
    },
 
    minName_1UK: {
        type: String, trim: true,
    },
    minName_1US: {
        type: String, trim: true,
    },
    minName_1FR: {
        type: String, trim: true,
    },
    minName_1DE: {
        type: String, trim: true,
    },
  
    maxName_1UK: {
        type: String, trim: true,
    },
    maxName_1US: {
        type: String, trim: true,
    },
    maxName_1FR: {
        type: String, trim: true,
    },
    maxName_1DE: {
        type: String, trim: true,
    },
  
    optionMaterial_2UK: {
        type: String, trim: true,
    },
    optionMaterial_2US: {
        type: String, trim: true,
    },
    optionMaterial_2FR: {
        type: String, trim: true,
    },
    optionMaterial_2DE: {
        type: String, trim: true,
    },
 
    minName_2UK: {
        type: String, trim: true,
    },
    minName_2US: {
        type: String, trim: true,
    },
    minName_2FR: {
        type: String, trim: true,
    },
    minName_2DE: {
        type: String, trim: true,
    },
 
    maxName_2UK: {
        type: String, trim: true,
    },
    maxName_2US: {
        type: String, trim: true,
    },
    maxName_2FR: {
        type: String, trim: true,
    },
    maxName_2DE: {
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
    },

    // setting
    processingTimeUK: {
      type: String, trim: true,
    },
    processingTimeUS: {
      type: String, trim: true,
    },
    processingTimeFR: {
      type: String, trim: true,
    },
    processingTimeDE: {
      type: String, trim: true,
    },
  
    shippingTimeUK: {
      type: String, trim: true,
    },
    shippingTimeUS: {
      type: String, trim: true,
    },
    shippingTimeFR: {
      type: String, trim: true,
    },
    shippingTimeDE: {
      type: String, trim: true,
    },
  
    templateProductUK: {
      type: String, trim: true,
    },
    templateProductUS: {
      type: String, trim: true,
    },
    templateProductFR: {
      type: String, trim: true,
    },
    templateProductDE: {
      type: String, trim: true,
    },

}
const Products = { ...ProductsBase, ...common };
const ProductsSchema = new Schema(Products, { versionKey: false });
ProductsSchema.plugin(mongoosePaginate);

const ProductsModels = mongoose.model('products', ProductsSchema);
module.exports = ProductsModels;