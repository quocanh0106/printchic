require('dotenv').config()
const TagService = require('../services/TagService');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    convertToObjectId,
    findDuplicateIndexes,
} = require('../utils/shared');
const { createValidator, validateNewObjIdValidator, updateValidator, validateCatTagIdValidator, validateTagValidator } = require('../validators/TagValidator');

module.exports.AUTH = {
    list: async (req, res) => {
        try {
            const result = await TagService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10601, result));
            }
            return res.json(responseSuccess(10601, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    create: async (req, res) => {
        try {
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }

            let fieldExistTitle = []
            const checkExistTag_UK = await TagService.checkExist({titleUK: req.body?.titleUK})
            const checkExistTag_US = await TagService.checkExist({titleUS: req.body?.titleUS})
            const checkExistTag_FR = await TagService.checkExist({titleFR: req.body?.titleFR})
            const checkExistTag_DE = await TagService.checkExist({titleDE: req.body?.titleDE})
            if(checkExistTag_UK) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistTag_US) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistTag_FR) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistTag_DE) {
                fieldExistTitle.push('titleDE')
            }
            if (checkExistTag_UK || checkExistTag_US || checkExistTag_FR || checkExistTag_DE) {
                return res.json(responseError(10905, fieldExistTitle));
            }

            const result = await TagService.create(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10900, result));
            }
            return res.json(responseSuccess(40211, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
        // })

    },
    delete: async (req, res) => {
        try {
            const errors = await validateResult(validateCatTagIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { tagId } = req.query;
            const result = await TagService.updateDelete({
                tagId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10902, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    info: async (req, res) => {
        try {
            const errors = await validateResult(validateCatTagIdValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }
            const { tagId } = req.query;
            const result = await TagService.findByConditions({
                tagId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10904, result));
            }
            return res.json(responseSuccess(40212, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    update: async (req, res) => {
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40004, errors));
            }

            let fieldExistTitle = []
            const checkExistProductCategory_UK = await TagService.checkExist({titleUK: req.body?.titleUK})
            const checkExistProductCategory_US = await TagService.checkExist({titleUS: req.body?.titleUS})
            const checkExistProductCategory_FR = await TagService.checkExist({titleFR: req.body?.titleFR})
            const checkExistProductCategory_DE = await TagService.checkExist({titleDE: req.body?.titleDE})
            if(checkExistProductCategory_UK && checkExistProductCategory_UK?._id.toHexString() !== req.body.tagId) {
                fieldExistTitle.push('titleUK')
            }
            if(checkExistProductCategory_US && checkExistProductCategory_US?._id.toHexString() !== req.body.tagId) {
                fieldExistTitle.push('titleUS')
            }
            if(checkExistProductCategory_FR && checkExistProductCategory_FR?._id.toHexString() !== req.body.tagId) {
                fieldExistTitle.push('titleFR')
            }
            if(checkExistProductCategory_DE && checkExistProductCategory_DE?._id.toHexString() !== req.body.tagId) {
                fieldExistTitle.push('titleDE')
            }
            if (fieldExistTitle.length > 0) {
                return res.json(responseError(10905, fieldExistTitle));
            }

            const result = await TagService.updateConditions(req.body)
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10603, result));
            }
            return res.json(responseSuccess(40213, []));

        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}