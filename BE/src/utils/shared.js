const sendMail = require('../configs/configMail');
const sanitize = require('mongo-sanitize');
const { check, validationResult } = require('express-validator');
const moment = require('moment-timezone');
const generatorTime = () => moment().format('YYYY-MM-DD HH:mm:ss');
const empty = require('is-empty');
const fs = require('fs');
const randomstring = require("randomstring");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { CODES_SUCCESS, CODES_ERROR } = require('./messages');
const { _m, _v } = require('./translate');
const { IS_DELETED, CONFIG_EXPIRED_UNIT } = require('./constants');
const generateRandomString = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}
const isNumber = (value) => /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/.test(value);
const makeDir = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
};
const urlImage = (req) => {
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const pathName = `${API_URL}/uploads/images/${req.file.filename}`;
    return pathName;
};
const urlFromFilename = (filename) => {
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const pathName = `${API_URL}/uploads/images/${filename}`;
    return pathName;
}
const urlAttachment = (req) => {
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const pathName = `${API_URL}/uploads/attachments/${req.file.filename}`;
    return pathName;
};
const convertUpperCase = (string) => {
    let value = '';
    value = String(string || '').trim().toUpperCase();
    return value;
};
const validateResult = async (validateFunc, req) => {
    if (Array.isArray(validateFunc)) {
        await Promise.all(validateFunc.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errors.array();
        }
        return [];
    }
    await validateFunc.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.array();
    }
    return [];
};
const isValidDate = (date, formatDate = '') => {
    let isValidDate = false;
    if (formatDate !== '') {
        isValidDate = moment(date, formatDate, true).isValid();
    } else {
        isValidDate = moment(date).isValid();
    }
    return isValidDate;
};
const responseError = (statusCode, errors = {}) => {
    console.log('errors 222222',errors)
    const response = {};
    response.success = false;
    response.statusCode = statusCode;
    response.message = _m(statusCode, 'CODES_ERROR') || statusCode;
    let message = '';
    if (!empty(errors)) {
        message = errors[0] && errors[0].msg ? errors[0].msg : CODES_ERROR[statusCode];
        message = errors.message ? errors.message : CODES_ERROR[statusCode];
        response.message = message;
        response.errors = errors;
    }
    return response;
};
const responseSuccess = (statusCode, result = {}) => {
    const response = {
        success: true,
        statusCode: statusCode,
        message: _m(statusCode, 'CODES_SUCCESS'),
    };
    if (result) {
        response.data = result;
    }
    return response;
};
const connectDatabase = (databaseName) => {
    const conn = mongoose.dbs[databaseName];
    return conn;
};
const convertToObjectId = (value) => {
    const { ObjectId } = require('mongodb');
    return ObjectId.isValid(value) ? ObjectId(sanitizeFieldName(value)) : null;
}
const sanitizeFieldName = (fieldName) => { // Injection
    if (fieldName) {
        return sanitize(fieldName);
    }
    return '';
};

const populateModel = (path, select = {}, match = {}, option = {}) => {
    const populate = {
        path: path,
        select: select,
        match: { isDeleted: IS_DELETED[200], ...match },
    };
    if (!isEmpty(option)) {
        populate.options = { ...option };
    }
    return populate;
};
const isEmpty = (value) => empty(value);
const promiseResolve = (data) => Promise.resolve(data);
const promiseReject = (err) => Promise.reject(err);
const escapeRegExp = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regExpSearch = (string = '') => {
    const regex = new RegExp(escapeRegExp(string), 'i');
    return regex;
};
const validateObjectId = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty().withMessage(`${field} is required`)
            .isMongoId()
            .withMessage(`${field} must is ObjectId`);
    }
    return check([field])
        .optional({ nullable: true }).isMongoId().withMessage(`${field} must is ObjectId or null`);
};
const trimValue = (value) => String(value || '').trim();
const facetPaginationAggregate = (page, limit, skip, sort, customFacet = null) => {
    let facet = {
        data: [
            { $sort: sort },
            { $skip: skip },
            { $limit: +limit },
        ],
        pagination: [
            { $count: 'itemCount' },
            {
                $addFields: { currentPage: page, limit },
            },
        ],
    };
    if (customFacet) {
        facet = {
            ...facet,
            ...customFacet,
        }
    }
    return facet;
};
const convertResultAggregatePagination = (result, page = 1, limit = 10) => {
    if (!isEmpty(result)) {
        const _pagination = !isEmpty(result) ? (result[0].pagination[0] || {
            currentPage: page,
            limit,
            itemCount: 0,
        })
            : {
                currentPage: 1,
                limit,
                itemCount: 0,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
            };
        _pagination.pageCount = Math.ceil(_pagination.itemCount / limit);
        _pagination.pagingCounter = Math.ceil(((page - 1) * limit) + 1);
        _pagination.hasPrevPage = Math.ceil(_pagination.itemCount / limit) >= page && page > 1;
        _pagination.hasNextPage = Math.ceil(_pagination.itemCount / limit) > page;
        _pagination.prevPage = (Math.ceil(_pagination.itemCount / limit) >= page && page > 1) ? Math.ceil(page - 1) : null;
        _pagination.nextPage = (Math.ceil(_pagination.itemCount / limit) > page) ? Math.ceil(page + 1) : null;

        const response = {
            items: result[0].data,
            paginator: {
                ..._pagination,
            },
        };
        return response;
    }
    const response = {
        currentPage: 1,
        limit,
        itemCount: 0,
        pageCount: 0,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
        data: [],
    };
    return response;
};
const lookupAggregate = (from, localField, foreignField, as) => ({
    from,
    let: { localField: `$${localField}` },
    pipeline: [{
        $match: {
            $expr: {
                $and: [
                    { $eq: [`$${foreignField}`, '$$localField'] },
                    { $eq: ['$isDeleted', IS_DELETED[200]] },
                ],
            },
        },
    }],
    as,
});
const unwindAggregate = (path, preserveNullAndEmptyArrays = true) => ({
    path, preserveNullAndEmptyArrays,
});
const generateExpiredTime = (value, unit) => {
    let result = null;
    const time = +value;
    switch (unit) {
        case CONFIG_EXPIRED_UNIT[100]: {
            result = moment().add(time, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        case CONFIG_EXPIRED_UNIT[200]: {
            result = moment().add(time, 'weeks').format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        case CONFIG_EXPIRED_UNIT[300]: {
            result = moment().add(time, 'months').format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        case CONFIG_EXPIRED_UNIT[400]: {
            result = moment().add(time, 'hours').format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        case CONFIG_EXPIRED_UNIT[500]: {
            result = moment().add(time, 'years').format('YYYY-MM-DD HH:mm:ss');
            break;
        }
        default: {
            break;
        }
    }
    return result;
}

const findDuplicateIndexes = (array, field) => {
    const duplicateIndexes = {};
    
    array.forEach((obj, index) => {
        if (!duplicateIndexes[obj[field]]) {
            duplicateIndexes[obj[field]] = [index];
        } else {
            duplicateIndexes[obj[field]].push(index);
        }
    });

    // Filter out objects with unique titles
    const result = Object.entries(duplicateIndexes)
        .filter(([title, indexes]) => indexes.length > 1)
        .map(([title, indexes]) => indexes);

    return result;
}


module.exports = {
    generatorTime,
    responseSuccess,
    responseError,
    connectDatabase,
    convertToObjectId,
    populateModel,
    promiseResolve,
    promiseReject,
    isEmpty,
    escapeRegExp,
    regExpSearch,
    validateObjectId,
    validateResult,
    isValidDate,
    sendMail,
    generateRandomString,
    isNumber,
    makeDir,
    urlImage,
    trimValue,
    facetPaginationAggregate,
    convertResultAggregatePagination,
    lookupAggregate,
    unwindAggregate,
    urlAttachment,
    convertUpperCase,
    urlFromFilename,
    generateExpiredTime,
    findDuplicateIndexes
}

