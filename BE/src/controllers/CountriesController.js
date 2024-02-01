require('dotenv').config()
const CountriesService = require('../services/CountriesService');
const CitiesService = require('../services/CitiesService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
    generatorTime,
} = require('../utils/shared');

const { listCitiesValidator } = require('../validators/DataSelectValidator');
const { createValidator, updateValidator, validateCountryObjIdValidator } = require('../validators/CountriesValidator');
const { STATUS, IS_DELETED } = require('../utils/constants');
const { upload } = require('../configs/configMulter');
const beforeUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (isEmpty(req.file)) return res.json(responseError(40183))
        return next();
    });
};
const beforeUploadUpdate = (req, res, next) => {
    upload(req, res, (err) => {
        return next();
    });
};
module.exports.DEFAULT = {

    listActive: async (req, res) => {
        // #swagger.tags = ['Data select'] 
        // #swagger.summary = 'Danh sách quốc gia'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await CountriesService.findByConditions({
                ...req.query,
                getAll: true,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10361, result));
            }
            return res.json(responseSuccess(10361, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
};
module.exports.AUTH = {
    list: async (req, res) => {
        // #swagger.tags = ['Quốc gia'] 
        // #swagger.summary = 'List quốc gia'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = await CountriesService.listAggregate({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10361, result));
            }
            return res.json(responseSuccess(10361, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    create: async (req, res) => {
        // #swagger.tags = ['Quốc gia'] 
        // #swagger.summary = 'Tạo quốc gia'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUpload(req, res, async () => {
            try {
                const errors = await validateResult(createValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                const { userObjId } = req.decoded;
                const { countryName, cities } = req.body;
                const findCountry = await CountriesService.findByConditions({
                    countryName,
                })
                if (!isEmpty(findCountry)) return res.json(responseError(40372));
                let logo = null;
                if (!isEmpty(req.file)) {
                    logo = urlImage(req);
                }
                const result = await CountriesService.create({
                    countryName,
                    logo,
                })
                if (!isEmpty(result)) {
                    if (!isEmpty(cities)) {
                        const paramsCities = cities.map((city) => ({
                            cityName: city,
                            countryObjId: result?._id,
                            status: STATUS[100],
                            isDeleted: IS_DELETED[100],
                            createdBy: userObjId,
                            createdAt: generatorTime(),
                        }))
                        await CitiesService.createMany({
                            values: paramsCities
                        })
                    }
                    return res.json(responseSuccess(10363, result));
                }
                return res.json(responseError(40370, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    update: async (req, res) => {
        // #swagger.tags = ['Quốc gia'] 
        // #swagger.summary = 'Update quốc gia'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        beforeUploadUpdate(req, res, async () => {
            try {
                const errors = await validateResult(updateValidator, req);
                if (!isEmpty(errors)) {
                    return res.json(responseError(40004, errors));
                }
                const { userObjId } = req.decoded;
                const { countryName, countryObjId, cities } = req.body;
                const findCountry = await CountriesService.findByConditions({
                    countryName,
                })
                if (!isEmpty(findCountry) && String(findCountry?._id) === countryObjId) return res.json(responseError(40372));
                let logo = null;
                if (!isEmpty(req.file)) {
                    logo = urlImage(req);
                }
                const result = await CountriesService.update({
                    countryName,
                    countryObjId,
                    logo,
                    createdBy: userObjId,
                })
                if (!isEmpty(result)) {
                    if (!isEmpty(cities)) {
                        await CitiesService.softDeleteMany({
                            countryObjId,
                        })
                        const paramsCities = cities.map((city) => ({
                            cityName: city,
                            countryObjId: result?._id,
                            status: STATUS[100],
                            isDeleted: IS_DELETED[100],
                            createdBy: userObjId,
                            createdAt: generatorTime(),
                        }))
                        await CitiesService.createMany({
                            values: paramsCities
                        })
                    }
                    return res.json(responseSuccess(10364, result));
                }
                return res.json(responseError(40371, []));
            } catch (errors) {
                console.log(errors, 'errors')
                return res.json(responseError(40004, errors));
            }
        })
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Quốc gia'] 
        // #swagger.summary = 'Xóa quốc gia'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(validateCountryObjIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { userObjId } = req.decoded;
            const { countryObjId } = req.body;
            const result = await CountriesService.softDelete({
                countryObjId,
            })
            if (!isEmpty(result)) {
                await CitiesService.softDeleteMany({
                    countryObjId,
                    createdBy: userObjId,
                })
                return res.json(responseSuccess(10365, result));
            }
            return res.json(responseError(40373, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}
