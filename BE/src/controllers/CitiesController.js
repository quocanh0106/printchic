require('dotenv').config()
const CitiesService = require('../services/CitiesService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');
const {
    CONFIG_TYPE
} = require('../utils/constants');
const { listCitiesValidator } = require('../validators/DataSelectValidator');

module.exports.DEFAULT = {

    listActive: async (req, res) => {
        // #swagger.tags = ['Data select'] 
        // #swagger.summary = 'Danh sách thành phố'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const errors = await validateResult(listCitiesValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const result = await CitiesService.findByConditions({
                ...req.query,
                getAll: true,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10362, result));
            }
            return res.json(responseSuccess(10362, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    }
}
