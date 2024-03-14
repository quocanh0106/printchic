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
    console.log('data', data)
    try {
        const set = {};
        set.titleUK = data.titleUK;
        set.titleUS = data.titleUS;
        set.titleFR = data.titleFR;
        set.titleDE = data.titleDE;

        set.handleUrlUK = data.handleUrlUK;
        set.handleUrlUS = data.handleUrlUS;
        set.handleUrlFR = data.handleUrlFR;
        set.handleUrlDE = data.handleUrlDE;

        set.metaDescriptionUK = data.metaDescriptionUK;
        set.metaDescriptionUS = data.metaDescriptionUS;
        set.metaDescriptionFR = data.metaDescriptionFR;
        set.metaDescriptionDE = data.metaDescriptionDE;

        set.typeUK = data.typeUK;
        set.typeUS = data.typeUS;
        set.typeFR = data.typeFR;
        set.typeDE = data.typeDE;

        set.categoryProduct = JSON.parse(data.categoryProduct)
        set.descriptionUK = data.descriptionUK;
        set.descriptionUS = data.descriptionUS;
        set.descriptionFR = data.descriptionFR;
        set.descriptionDE = data.descriptionDE;

        set.pajamasUK = data.pajamasUK;
        set.pajamasUS = data.pajamasUS;
        set.pajamasFR = data.pajamasFR;
        set.pajamasDE = data.pajamasDE;

        set.paragraphUK = data.paragraphUK;
        set.paragraphUS = data.paragraphUS;
        set.paragraphFR = data.paragraphFR;
        set.paragraphDE = data.paragraphDE;

        set.variants = JSON.parse(data.variants);
        set.status = data.status;
        set.media = data.media;
        set.currency = data.currency;
        set.price = data.price;
        set.priceSale = data.priceSale;

        set.customizationOptions = data.customizationOptions;
        set.detailProduct = data.detailProduct;
        set.valueMaterial_1 = data.valueMaterial_1;
        set.valueMaterial_2 = data.valueMaterial_2;
        set.featureProduct = data.featureProduct;

        set.optionMaterial_1 = data.optionMaterial_1;
        set.minName_1 = data.minName_1;
        set.maxName_1 = data.maxName_1;
        set.optionMaterial_2 = data.optionMaterial_2;
        set.minName_2 = data.minName_2;
        set.maxName_2 = data.maxName_2;

        set.tabProductDetailUK = data.tabProductDetailUK;
        set.tabProductDetailUS = data.tabProductDetailUS;
        set.tabProductDetailFR = data.tabProductDetailFR;
        set.tabProductDetailDE = data.tabProductDetailDE;

        set.tabSizeGuideUK = data.tabSizeGuideUK;
        set.tabSizeGuideUS = data.tabSizeGuideUS;
        set.tabSizeGuideFR = data.tabSizeGuideFR;
        set.tabSizeGuideDE = data.tabSizeGuideDE;

        set.tabMockupTemplateUK = data.tabMockupTemplateUK;
        set.tabMockupTemplateUS = data.tabMockupTemplateUS;
        set.tabMockupTemplateFR = data.tabMockupTemplateFR;
        set.tabMockupTemplateDE = data.tabMockupTemplateDE;

        set.tabCareInstructionUK = data.tabCareInstructionUK;
        set.tabCareInstructionUS = data.tabCareInstructionUS;
        set.tabCareInstructionFR = data.tabCareInstructionFR;
        set.tabCareInstructionDE = data.tabCareInstructionDE;

        set.btnLink = data.btnLink;

        set.createdBy = convertToObjectId(data.createdBy);
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

        if (!isEmpty(data?.customizationOptions)) {
            set.customizationOptions = data.customizationOptions;
        }
        if (!isEmpty(data?.detailProduct)) {
            set.detailProduct = data.detailProduct;
        }
        if (!isEmpty(data?.valueMaterial_1)) {
            set.valueMaterial_1 = data.valueMaterial_1;
        }
        if (!isEmpty(data?.valueMaterial_2)) {
            set.valueMaterial_2 = data.valueMaterial_2;
        }
        if (!isEmpty(data?.featureProduct)) {
            set.featureProduct = data.featureProduct;
        }

        if (!isEmpty(data?.optionMaterial_1)) {
            set.optionMaterial_1 = data.optionMaterial_1;
        }
        if (!isEmpty(data?.minName_1)) {
            set.minName_1 = data.minName_1;
        }
        if (!isEmpty(data?.maxName_1)) {
            set.maxName_1 = data.maxName_1;
        }

        if (!isEmpty(data?.optionMaterial_2)) {
            set.optionMaterial_2 = data.optionMaterial_2;
        }
        if (!isEmpty(data?.minName_2)) {
            set.minName_2 = data.minName_2;
        }
        if (!isEmpty(data?.maxName_2)) {
            set.maxName_2 = data.maxName_2;
        }

        if (!isEmpty(data?.categoryProductId)) {
            set.categoryProductId = convertToObjectId(data?.categoryProductId || '');
        }
        
        if (!isEmpty(data?.descriptionUK)) {
            set.descriptionUk = data.descriptionUk;
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

        if (!isEmpty(data?.pajamasUK)) {
            set.pajamasUk = data.pajamasUk;
        }
        if (!isEmpty(data?.pajamasUS)) {
            set.pajamasUS = data.pajamasUS;
        }
        if (!isEmpty(data?.pajamasFR)) {
            set.pajamasFR = data.pajamasFR;
        }
        if (!isEmpty(data?.pajamasDE)) {
            set.pajamasDE = data.pajamasDE;
        }

        if (!isEmpty(data?.paragraphUK)) {
            set.paragraphUk = data.paragraphUk;
        }
        if (!isEmpty(data?.paragraphUS)) {
            set.paragraphUS = data.paragraphUS;
        }
        if (!isEmpty(data?.paragraphFR)) {
            set.paragraphFR = data.paragraphFR;
        }
        if (!isEmpty(data?.paragraphDE)) {
            set.paragraphDE = data.paragraphDE;
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
