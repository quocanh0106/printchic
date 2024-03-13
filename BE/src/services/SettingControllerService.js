const {
    settings: SettingModels,
} = require('../models/utils/connectToModels');

const {
    promiseResolve, convertToObjectId, promiseReject, isNumber,
    isEmpty,
} = require('../utils/shared');
const findByConditions = async () => {
    try {
        const result = await SettingModels.find();
        console.log('reeee', result)
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
        if (data?.settingId) {
            conditions._id = convertToObjectId(data.settingId);
        }
        const set = {};
        if (!isEmpty(data?.siteNameUK)) {
            set.siteNameUK = data.siteNameUK;
        }
        if (!isEmpty(data?.siteNameUS)) {
            set.siteNameUS = data.siteNameUS;
        }
        if (!isEmpty(data?.siteNameFR)) {
            set.siteNameFR = data.siteNameFR;
        }
        if (!isEmpty(data?.siteNameDE)) {
            set.siteNameDE = data.siteNameDE;
        }

        if (!isEmpty(data?.imageFeature)) {
            set.imageFeature = data.imageFeature;
        }  

        if (!isEmpty(data?.metaTitleUK)) {
            set.metaTitleUK = data.metaTitleUK;
        }
        if (!isEmpty(data?.metaTitleUS)) {
            set.metaTitleUS = data.metaTitleUS;
        }
        if (!isEmpty(data?.metaTitleFR)) {
            set.metaTitleFR = data.metaTitleFR;
        }
        if (!isEmpty(data?.metaTitleDE)) {
            set.metaTitleDE = data.metaTitleDE;
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

        if (!isEmpty(data?.headTagUK)) {
            set.headTagUK = data.headTagUK;
        }
        if (!isEmpty(data?.headTagUS)) {
            set.headTagUS = data.headTagUS;
        }
        if (!isEmpty(data?.headTagFR)) {
            set.headTagFR = data.headTagFR;
        }
        if (!isEmpty(data?.headTagDE)) {
            set.headTagDE = data.headTagDE;
        }

        if (!isEmpty(data?.footerTagUK)) {
            set.footerTagUK = data.footerTagUK;
        }
        if (!isEmpty(data?.footerTagUS)) {
            set.footerTagUS = data.footerTagUS;
        }
        if (!isEmpty(data?.footerTagFR)) {
            set.footerTagFR = data.footerTagFR;
        }
        if (!isEmpty(data?.footerTagDE)) {
            set.footerTagDE = data.footerTagDE;
        }

        if (!isEmpty(data?.headEmbedAllUK)) {
            set.headEmbedAllUK = data.headEmbedAllUK;
        }
        if (!isEmpty(data?.headEmbedAllUS)) {
            set.headEmbedAllUS = data.headEmbedAllUS;
        }
        if (!isEmpty(data?.headEmbedAllFR)) {
            set.headEmbedAllFR = data.headEmbedAllFR;
        }
        if (!isEmpty(data?.headEmbedAllDE)) {
            set.headEmbedAllDE = data.headEmbedAllDE;
        }

        if (!isEmpty(data?.headTagAllUK)) {
            set.headTagAllUK = data.headTagAllUK;
        }
        if (!isEmpty(data?.headTagAllUS)) {
            set.headTagAllUS = data.headTagAllUS;
        }
        if (!isEmpty(data?.headTagAllFR)) {
            set.headTagAllFR = data.headTagAllFR;
        }
        if (!isEmpty(data?.headTagAllDE)) {
            set.headTagAllDE = data.headTagAllDE;
        }

        if (!isEmpty(data?.footerTagAllUK)) {
            set.footerTagAllUK = data.footerTagAllUK;
        }
        if (!isEmpty(data?.footerTagAllUS)) {
            set.footerTagAllUS = data.footerTagAllUS;
        }
        if (!isEmpty(data?.footerTagAllFR)) {
            set.footerTagAllFR = data.footerTagAllFR;
        }
        if (!isEmpty(data?.footerTagAllDE)) {
            set.footerTagAllDE = data.footerTagAllDE;
        }

        if (!isEmpty(data?.language)) {
            set.language = data.language;
        }

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

        const result = await SettingModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    findByConditions,
    updateConditions,
};
