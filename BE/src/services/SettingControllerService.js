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
        if (!isEmpty(data?.siteName)) {
            set.siteName = data.siteName;
        }
        if (!isEmpty(data?.imageFeature)) {
            set.imageFeature = data.imageFeature;
        }
        if (!isEmpty(data?.metaTitle)) {
            set.metaTitle = data.metaTitle;
        }
        if (!isEmpty(data?.metaDescription)) {
            set.metaDescription = data.metaDescription;
        }
        if (!isEmpty(data?.headTag)) {
            set.headTag = data.headTag;
        }
        if (!isEmpty(data?.footerTag)) {
            set.footerTag = data.footerTag;
        }
        if (!isEmpty(data?.headEmbedAll)) {
            set.headEmbedAll = data.headEmbedAll;
        }
        if (!isEmpty(data?.headTagAll)) {
            set.headTagAll = data.headTagAll;
        }
        if (!isEmpty(data?.footerTagAll)) {
            set.footerTagAll = data.footerTagAll;
        }
        if (!isEmpty(data?.language)) {
            set.language = data.language;
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
