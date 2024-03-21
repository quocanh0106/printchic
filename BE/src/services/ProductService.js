const {
    products: ProductsModels,
    category_product: CategoryProductModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty, regExpSearch, trimValue, generatorTime, facetPaginationAggregate,
    convertResultAggregatePagination,
    populateModel,
} = require('../utils/shared');
const { IS_DELETED, STATUS } = require('../utils/constants');
const { MY_CUSTOM_LABELS } = require('../utils/constants');
const mongoose = require('mongoose');
const create = async (data) => {
    try {
        const set = {};
        set.titleUK = data?.titleUK;
        set.titleUS = data?.titleUS;
        set.titleFR = data?.titleFR;
        set.titleDE = data?.titleDE;

        set.handleUrlUK = data?.handleUrlUK;
        set.handleUrlUS = data?.handleUrlUS;
        set.handleUrlFR = data?.handleUrlFR;
        set.handleUrlDE = data?.handleUrlDE;

        set.metaDescriptionUK = data?.metaDescriptionUK;
        set.metaDescriptionUS = data?.metaDescriptionUS;
        set.metaDescriptionFR = data?.metaDescriptionFR;
        set.metaDescriptionDE = data?.metaDescriptionDE;

        set.typeUK = data?.typeUK;
        set.typeUS = data?.typeUS;
        set.typeFR = data?.typeFR;
        set.typeDE = data?.typeDE;

        set.categoryProduct = JSON.parse(data?.categoryProduct)
        set.descriptionUK = data?.descriptionUK;
        set.descriptionUS = data?.descriptionUS;
        set.descriptionFR = data?.descriptionFR;
        set.descriptionDE = data?.descriptionDE;

        set.variants = JSON.parse(data?.variants);
        set.status = data?.status;
        set.media = data?.media;
        set.currency = data?.currency;
        set.price = data?.price;
        set.priceSale = data?.priceSale;

        set.customizationOptionsUK = data?.customizationOptionsUK;
        set.customizationOptionsUS = data?.customizationOptionsUS;
        set.customizationOptionsFR = data?.customizationOptionsFR;
        set.customizationOptionsDE = data?.customizationOptionsDE;

        set.detailProductUK = data?.detailProductUK;
        set.detailProductUS = data?.detailProductUS;
        set.detailProductFR = data?.detailProductFR;
        set.detailProductDE = data?.detailProductDE;

        set.valueMaterial_1 = data?.valueMaterial_1;

        set.valueMaterial_2 = data?.valueMaterial_2;

        set.featureProductUK = data?.featureProductUK;
        set.featureProductUS = data?.featureProductUS;
        set.featureProductFR = data?.featureProductFR;
        set.featureProductDE = data?.featureProductDE;

        set.optionMaterial_1UK = data?.optionMaterial_1UK;
        set.optionMaterial_1US = data?.optionMaterial_1US;
        set.optionMaterial_1FR = data?.optionMaterial_1FR;
        set.optionMaterial_1DE = data?.optionMaterial_1DE;

        set.minName_1UK = data?.minName_1UK;
        set.minName_1US = data?.minName_1US;
        set.minName_1FR = data?.minName_1FR;
        set.minName_1DE = data?.minName_1DE;

        set.maxName_1UK = data?.maxName_1UK;
        set.maxName_1US = data?.maxName_1US;
        set.maxName_1FR = data?.maxName_1FR;
        set.maxName_1DE = data?.maxName_1DE;

        set.optionMaterial_2UK = data?.optionMaterial_2UK;
        set.optionMaterial_2US = data?.optionMaterial_2US;
        set.optionMaterial_2FR = data?.optionMaterial_2FR;
        set.optionMaterial_2DE = data?.optionMaterial_2DE;

        set.minName_2UK = data?.minName_2UK;
        set.minName_2US = data?.minName_2US;
        set.minName_2FR = data?.minName_2FR;
        set.minName_2DE = data?.minName_2DE;

        set.maxName_2UK = data?.maxName_2UK;
        set.maxName_2US = data?.maxName_2US;
        set.maxName_2FR = data?.maxName_2FR;
        set.maxName_2DE = data?.maxName_2DE;

        set.featureProductLabelUK = data?.featureProductLabelUK;
        set.featureProductLabelUS = data?.featureProductLabelUS;
        set.featureProductLabelFR = data?.featureProductLabelFR;
        set.featureProductLabelDE = data?.featureProductLabelDE;

        set.optionMaterialLabelUK = data?.optionMaterialLabelUK;
        set.optionMaterialLabelUS = data?.optionMaterialLabelUS;
        set.optionMaterialLabelFR = data?.optionMaterialLabelFR;
        set.optionMaterialLabelDE = data?.optionMaterialLabelDE;

        set.detailProductLabelUK = data?.detailProductLabelUK;
        set.detailProductLabelUS = data?.detailProductLabelUS;
        set.detailProductLabelFR = data?.detailProductLabelFR;
        set.detailProductLabelDE = data?.detailProductLabelDE;

        set.customizationOptionsLabelUK = data?.customizationOptionsLabelUK;
        set.customizationOptionsLabelUS = data?.customizationOptionsLabelUS;
        set.customizationOptionsLabelFR = data?.customizationOptionsLabelFR;
        set.customizationOptionsLabelDE = data?.customizationOptionsLabelDE;

        set.tabProductDetailUK = data?.tabProductDetailUK;
        set.tabProductDetailUS = data?.tabProductDetailUS;
        set.tabProductDetailFR = data?.tabProductDetailFR;
        set.tabProductDetailDE = data?.tabProductDetailDE;

        set.tabSizeGuideUK = data?.tabSizeGuideUK;
        set.tabSizeGuideUS = data?.tabSizeGuideUS;
        set.tabSizeGuideFR = data?.tabSizeGuideFR;
        set.tabSizeGuideDE = data?.tabSizeGuideDE;

        set.tabMockupTemplateUK = data?.tabMockupTemplateUK;
        set.tabMockupTemplateUS = data?.tabMockupTemplateUS;
        set.tabMockupTemplateFR = data?.tabMockupTemplateFR;
        set.tabMockupTemplateDE = data?.tabMockupTemplateDE;

        set.tabCareInstructionUK = data?.tabCareInstructionUK;
        set.tabCareInstructionUS = data?.tabCareInstructionUS;
        set.tabCareInstructionFR = data?.tabCareInstructionFR;
        set.tabCareInstructionDE = data?.tabCareInstructionDE;

        // setting
        set.processingTimeUK = data?.processingTimeUK;
        set.processingTimeUS = data?.processingTimeUS;
        set.processingTimeFR = data?.processingTimeFR;
        set.processingTimeDE = data?.processingTimeDE;

        set.shippingTimeUK = data?.shippingTimeUK;
        set.shippingTimeUS = data?.shippingTimeUS;
        set.shippingTimeFR = data?.shippingTimeFR;
        set.shippingTimeDE = data?.shippingTimeDE;

        set.templateProductUK = data?.templateProductUK;
        set.templateProductUS = data?.templateProductUS;
        set.templateProductFR = data?.templateProductFR;
        set.templateProductDE = data?.templateProductDE;

        set.metaTitleUK = data?.metaTitleUK;
        set.metaTitleUS = data?.metaTitleUS;
        set.metaTitleDE = data?.metaTitleDE;
        set.metaTitleFR = data?.metaTitleFR;

        set.btnLink = data?.btnLink;

        set.createdBy = convertToObjectId(data?.createdBy);
        set.createdAt = generatorTime();
        const result = await ProductsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const list = async (data) => {
    try {
        const { sortKey = "created", sortOrder = -1, page = 1, limit = 1000 } = data;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.categoryProductId) {
            conditions.categoryProduct = data?.categoryProductId;
        }
        if (data?.status) {
            conditions.status = data?.status;
        }
        if (data?.titleUS) {
            conditions.titleUS = data?.titleUS;
        }
        if (data?.titleUK) {
            conditions.titleUK = data?.titleUK;
        }
        if (data?.titleFR) {
            conditions.titleFR = data?.titleFR;
        }
        if (data?.titleDE) {
            conditions.titleDE = data?.titleDE;
        }
        if (data?.search) {
            const search = regExpSearch(data.search);
            conditions.$or = [
                { titleUS: search },
                { titleUK: search },
                { titleFR: search },
                { titleDE: search },
            ]
        }
        const options = {
            sort: {
                createdAt: -1,
                [sortKey]: sortOrder,
            },
            page: +page,
            limit: +limit,
            lean: true,
            // select: REMOVE_FIELDS,
            customLabels: MY_CUSTOM_LABELS,
            // populate: [
            //     populateModel('categoryProduct')
            // ]
        };
        // 1. findAll
        // 2. filter -> [] -> array ids
        // 3. conditions.id in ids
        const result = await ProductsModels.paginate(conditions, options);
        // if (data?.categoryProductId) {
        //     result.items = result.items.filter(ele => {
        //         return ele.categoryProduct?.includes(data?.categoryProductId)
        //     })
        // }
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200]
        };
        if (data?.productId) {
            conditions._id = convertToObjectId(data.productId);
        }
        if (data?.getAll) {
            const result = await ProductsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await ProductsModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}

const updateConditions = async (data) => {
    console.log('data', data)

    try {
        const conditions = {};
        if (data?.productId) {
            conditions._id = convertToObjectId(data.productId);
        }
        const set = {};
        if (!isEmpty(data?.titleUK)) {
            set.titleUK = data.titleUK;
        }
        if (!isEmpty(data?.titleUS)) {
            set.titleUS = data.titleUS;
        }
        if (!isEmpty(data?.titleFR)) {
            set.titleFR = data.titleFR;
        }
        if (!isEmpty(data?.titleDE)) {
            set.titleDE = data.titleDE;
        }

        if (!isEmpty(data?.handleUrlUK)) {
            set.handleUrlUK = data.handleUrlUK;
        }
        if (!isEmpty(data?.handleUrlUS)) {
            set.handleUrlUS = data.handleUrlUS;
        }
        if (!isEmpty(data?.handleUrlFR)) {
            set.handleUrlFR = data.handleUrlFR;
        }
        if (!isEmpty(data?.handleUrlDE)) {
            set.handleUrlDE = data.handleUrlDE;
        }

        if (!isEmpty(data?.metaDescriptionUK)) {
            set.metaDescriptionUK = data.metaDescriptionUK;
        }
        if (!isEmpty(data?.metaDescriptionUS)) {
            set.metaDescriptionUS = data.metaDescriptionUS;
        }
        if (!isEmpty(data?.metaDescriptionFR)) {
            set.metaDescriptionFR = data.metaDescriptionFR;
        }
        if (!isEmpty(data?.metaDescriptionDE)) {
            set.metaDescriptionDE = data.metaDescriptionDE;
        }

        if (!isEmpty(data?.typeUK)) {
            set.typeUK = data.typeUK;
        }
        if (!isEmpty(data?.typeUS)) {
            set.typeUS = data.typeUS;
        }
        if (!isEmpty(data?.typeFR)) {
            set.typeFR = data.typeFR;
        }
        if (!isEmpty(data?.typeDE)) {
            set.typeDE = data.typeDE;
        }

        if (!isEmpty(data?.tabProductDetailUK)) {
            set.tabProductDetailUK = data.tabProductDetailUK;
        }
        if (!isEmpty(data?.tabProductDetailUS)) {
            set.tabProductDetailUS = data.tabProductDetailUS;
        }
        if (!isEmpty(data?.tabProductDetailFR)) {
            set.tabProductDetailFR = data.tabProductDetailFR;
        }
        if (!isEmpty(data?.tabProductDetailDE)) {
            set.tabProductDetailDE = data.tabProductDetailDE;
        }

        if (!isEmpty(data?.tabSizeGuideUK)) {
            set.tabSizeGuideUK = data.tabSizeGuideUK;
        }
        if (!isEmpty(data?.tabSizeGuideUS)) {
            set.tabSizeGuideUS = data.tabSizeGuideUS;
        }
        if (!isEmpty(data?.tabSizeGuideFR)) {
            set.tabSizeGuideFR = data.tabSizeGuideFR;
        }
        if (!isEmpty(data?.tabSizeGuideDE)) {
            set.tabSizeGuideDE = data.tabSizeGuideDE;
        }

        if (!isEmpty(data?.tabMockupTemplateUK)) {
            set.tabMockupTemplateUK = data.tabMockupTemplateUK;
        }
        if (!isEmpty(data?.tabMockupTemplateUS)) {
            set.tabMockupTemplateUS = data.tabMockupTemplateUS;
        }
        if (!isEmpty(data?.tabMockupTemplateFR)) {
            set.tabMockupTemplateFR = data.tabMockupTemplateFR;
        }
        if (!isEmpty(data?.tabMockupTemplateDE)) {
            set.tabMockupTemplateDE = data.tabMockupTemplateDE;
        }

        if (!isEmpty(data?.tabCareInstructionUK)) {
            set.tabCareInstructionUK = data.tabCareInstructionUK;
        }
        if (!isEmpty(data?.tabCareInstructionUS)) {
            set.tabCareInstructionUS = data.tabCareInstructionUS;
        }
        if (!isEmpty(data?.tabCareInstructionFR)) {
            set.tabCareInstructionFR = data.tabCareInstructionFR;
        }
        if (!isEmpty(data?.tabCareInstructionDE)) {
            set.tabCareInstructionDE = data.tabCareInstructionDE;
        }

        if (!isEmpty(data?.customizationOptionsUK)) {
            set.customizationOptionsUK = data.customizationOptionsUK;
        }
        if (!isEmpty(data?.customizationOptionsUS)) {
            set.customizationOptionsUS = data.customizationOptionsUS;
        }
        if (!isEmpty(data?.customizationOptionsFR)) {
            set.customizationOptionsFR = data.customizationOptionsFR;
        }
        if (!isEmpty(data?.customizationOptionsDE)) {
            set.customizationOptionsDE = data.customizationOptionsDE;
        }

        if (!isEmpty(data?.detailProductUK)) {
            set.detailProductUK = data.detailProductUK;
        }
        if (!isEmpty(data?.detailProductUS)) {
            set.detailProductUS = data.detailProductUS;
        }
        if (!isEmpty(data?.detailProductFR)) {
            set.detailProductFR = data.detailProductFR;
        }
        if (!isEmpty(data?.detailProductDE)) {
            set.detailProductDE = data.detailProductDE;
        }

        if (!isEmpty(data?.valueMaterial_1)) {
            set.valueMaterial_1 = data.valueMaterial_1;
        }

        if (!isEmpty(data?.valueMaterial_2)) {
            set.valueMaterial_2 = data.valueMaterial_2;
        }

        if (!isEmpty(data?.featureProductUK)) {
            set.featureProductUK = data.featureProductUK;
        }
        if (!isEmpty(data?.featureProductUS)) {
            set.featureProductUS = data.featureProductUS;
        }
        if (!isEmpty(data?.featureProductFR)) {
            set.featureProductFR = data.featureProductFR;
        }
        if (!isEmpty(data?.featureProductDE)) {
            set.featureProductDE = data.featureProductDE;
        }

        if (!isEmpty(data?.optionMaterial_1UK)) {
            set.optionMaterial_1UK = data.optionMaterial_1UK;
        }
        if (!isEmpty(data?.optionMaterial_1US)) {
            set.optionMaterial_1US = data.optionMaterial_1US;
        }
        if (!isEmpty(data?.optionMaterial_1FR)) {
            set.optionMaterial_1FR = data.optionMaterial_1FR;
        }
        if (!isEmpty(data?.optionMaterial_1DE)) {
            set.optionMaterial_1DE = data.optionMaterial_1DE;
        }

        if (!isEmpty(data?.minName_1UK)) {
            set.minName_1UK = data.minName_1UK;
        }
        if (!isEmpty(data?.minName_1US)) {
            set.minName_1US = data.minName_1US;
        }
        if (!isEmpty(data?.minName_1FR)) {
            set.minName_1FR = data.minName_1FR;
        }
        if (!isEmpty(data?.minName_1DE)) {
            set.minName_1DE = data.minName_1DE;
        }

        if (!isEmpty(data?.maxName_1UK)) {
            set.maxName_1UK = data.maxName_1UK;
        }
        if (!isEmpty(data?.maxName_1US)) {
            set.maxName_1US = data.maxName_1US;
        }
        if (!isEmpty(data?.maxName_1FR)) {
            set.maxName_1FR = data.maxName_1FR;
        }
        if (!isEmpty(data?.maxName_1DE)) {
            set.maxName_1DE = data.maxName_1DE;
        }

        if (!isEmpty(data?.optionMaterial_2UK)) {
            set.optionMaterial_2UK = data.optionMaterial_2UK;
        }
        if (!isEmpty(data?.optionMaterial_2US)) {
            set.optionMaterial_2US = data.optionMaterial_2US;
        }
        if (!isEmpty(data?.optionMaterial_2FR)) {
            set.optionMaterial_2FR = data.optionMaterial_2FR;
        }
        if (!isEmpty(data?.optionMaterial_2DE)) {
            set.optionMaterial_2DE = data.optionMaterial_2DE;
        }

        if (!isEmpty(data?.minName_2UK)) {
            set.minName_2UK = data.minName_2UK;
        }
        if (!isEmpty(data?.minName_2US)) {
            set.minName_2US = data.minName_2US;
        }
        if (!isEmpty(data?.minName_2FR)) {
            set.minName_2FR = data.minName_2FR;
        }
        if (!isEmpty(data?.minName_2DE)) {
            set.minName_2DE = data.minName_2DE;
        }

        if (!isEmpty(data?.maxName_2UK)) {
            set.maxName_2UK = data.maxName_2UK;
        }
        if (!isEmpty(data?.maxName_2US)) {
            set.maxName_2US = data.maxName_2US;
        }
        if (!isEmpty(data?.maxName_2FR)) {
            set.maxName_2FR = data.maxName_2FR;
        }
        if (!isEmpty(data?.maxName_2DE)) {
            set.maxName_2DE = data.maxName_2DE;
        }

        if (!isEmpty(data?.featureProductLabelUK)) {
            set.featureProductLabelUK = data.featureProductLabelUK;
        }
        if (!isEmpty(data?.featureProductLabelUS)) {
            set.featureProductLabelUS = data.featureProductLabelUS;
        }
        if (!isEmpty(data?.featureProductLabelFR)) {
            set.featureProductLabelFR = data.featureProductLabelFR;
        }
        if (!isEmpty(data?.featureProductLabelDE)) {
            set.featureProductLabelDE = data.featureProductLabelDE;
        }

        if (!isEmpty(data?.optionMaterialLabelUK)) {
            set.optionMaterialLabelUK = data.optionMaterialLabelUK;
        }
        if (!isEmpty(data?.optionMaterialLabelUS)) {
            set.optionMaterialLabelUS = data.optionMaterialLabelUS;
        }
        if (!isEmpty(data?.optionMaterialLabelFR)) {
            set.optionMaterialLabelFR = data.optionMaterialLabelFR;
        }
        if (!isEmpty(data?.optionMaterialLabelDE)) {
            set.optionMaterialLabelDE = data.optionMaterialLabelDE;
        }

        if (!isEmpty(data?.detailProductLabelUK)) {
            set.detailProductLabelUK = data.detailProductLabelUK;
        }
        if (!isEmpty(data?.detailProductLabelUS)) {
            set.detailProductLabelUS = data.detailProductLabelUS;
        }
        if (!isEmpty(data?.detailProductLabelFR)) {
            set.detailProductLabelFR = data.detailProductLabelFR;
        }
        if (!isEmpty(data?.detailProductLabelDE)) {
            set.detailProductLabelDE = data.detailProductLabelDE;
        }

        if (!isEmpty(data?.customizationOptionsLabelUK)) {
            set.customizationOptionsLabelUK = data.customizationOptionsLabelUK;
        }
        if (!isEmpty(data?.customizationOptionsLabelUS)) {
            set.customizationOptionsLabelUS = data.customizationOptionsLabelUS;
        }
        if (!isEmpty(data?.customizationOptionsLabelFR)) {
            set.customizationOptionsLabelFR = data.customizationOptionsLabelFR;
        }
        if (!isEmpty(data?.customizationOptionsLabelDE)) {
            set.customizationOptionsLabelDE = data.customizationOptionsLabelDE;
        }


        if (!isEmpty(data?.categoryProductId)) {
            set.categoryProductId = convertToObjectId(data?.categoryProductId || '');
        }

        if (!isEmpty(data?.descriptionUK)) {
            set.descriptionUK = data.descriptionUK;
        }
        if (!isEmpty(data?.descriptionUS)) {
            set.descriptionUS = data.descriptionUS;
        }
        if (!isEmpty(data?.descriptionFR)) {
            set.descriptionFR = data.descriptionFR;
        }
        if (!isEmpty(data?.descriptionDE)) {
            set.descriptionDE = data.descriptionDE;
        }

        if (!isEmpty(data?.variants)) {
            set.variants = JSON.parse(data.variants);
        }
        if (!isEmpty(data?.status)) {
            set.status = data.status;
        }
        if (!isEmpty(data?.media)) {
            set.media = data.media;
        }
        if (!isEmpty(data?.currency)) {
            set.currency = data.currency;
        }
        if (!isEmpty(data?.price)) {
            set.price = data.price;
        }
        if (!isEmpty(data?.priceSale)) {
            set.priceSale = data.priceSale;
        }

        if (!isEmpty(data?.btnLink)) {
            set.btnLink = data.btnLink;
        }

        // setting
        if (!isEmpty(data?.processingTimeUK)) {
            set.processingTimeUK = data.processingTimeUK;
        }
        if (!isEmpty(data?.processingTimeUS)) {
            set.processingTimeUS = data.processingTimeUS;
        }
        if (!isEmpty(data?.processingTimeFR)) {
            set.processingTimeFR = data.processingTimeFR;
        }
        if (!isEmpty(data?.processingTimeDE)) {
            set.processingTimeDE = data.processingTimeDE;
        }

        if (!isEmpty(data?.shippingTimeUK)) {
            set.shippingTimeUK = data.shippingTimeUK;
        }
        if (!isEmpty(data?.shippingTimeUS)) {
            set.shippingTimeUS = data.shippingTimeUS;
        }
        if (!isEmpty(data?.shippingTimeFR)) {
            set.shippingTimeFR = data.shippingTimeFR;
        }
        if (!isEmpty(data?.shippingTimeDE)) {
            set.shippingTimeDE = data.shippingTimeDE;
        }

        if (!isEmpty(data?.templateProductUK)) {
            set.templateProductUK = data.templateProductUK;
        }
        if (!isEmpty(data?.templateProductUS)) {
            set.templateProductUS = data.templateProductUS;
        }
        if (!isEmpty(data?.templateProductFR)) {
            set.templateProductFR = data.templateProductFR;
        }
        if (!isEmpty(data?.templateProductDE)) {
            set.templateProductDE = data.templateProductDE;
        }

        if (!isEmpty(data?.metaTitleUK)) {
            set.metaTitleUK = JSON.parse(data.metaTitleUK);
        }
        if (!isEmpty(data?.metaTitleUS)) {
            set.metaTitleUS = JSON.parse(data.metaTitleUS);
        }
        if (!isEmpty(data?.metaTitleFR)) {
            set.metaTitleFR = JSON.parse(data.metaTitleFR);
        }
        if (!isEmpty(data?.metaTitleDE)) {
            set.metaTitleDE = JSON.parse(data.metaTitleDE);
        }

        const result = await ProductsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: data.productId,
        };
        const set = {
            isDeleted: IS_DELETED[300],
        }
        const result = await ProductsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const updateStatus = async (data) => {
    try {
        const conditions = {};
        if (data?.newObjId) {
            conditions._id = convertToObjectId(data.newObjId);
        }
        const set = {};
        set.status = STATUS[data.status];
        const result = await CategoryProductModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}


const checkExist = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
            ...data
        };
        const checkExistTitle = await ProductsModels.findOne(conditions);
        return promiseResolve(checkExistTitle);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}


module.exports = {
    create,
    findByConditions,
    updateConditions,
    updateDelete,
    updateStatus,
    list,
    checkExist
};
