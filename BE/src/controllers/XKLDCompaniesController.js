require('dotenv').config()
const XKLDCompaniesService = require('../services/XKLDCompaniesService');
const {
    responseError,
    isEmpty,
    responseSuccess,
} = require('../utils/shared');


module.exports.DEFAULT = {
    list: async (req, res) => {
        // #swagger.tags = ['XKLD Companies'] 
        // #swagger.summary = 'Danh sách cty xkld'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const { page, limit } = req.query;
            const result = await XKLDCompaniesService.list({
                page,
                limit,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10473, result));
            }
            return res.json(responseSuccess(10473, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },

}
