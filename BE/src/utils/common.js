const jwt = require('jsonwebtoken');
const { responseError } = require('./shared');
const configJwt = require('../configs/configJWT');
const { TYPE_USER } = require('./constants');
module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'] || req.body.token || req.query.token;
            if (!token) {
                return res.json(responseError(40001));
            }
            jwt.verify(token, configJwt.secret, async (err, decoded) => {
                if (err) {
                    return res.json(responseError(40005));
                }
                req.decoded = {
                    ...decoded,
                };
                return next();
            });
        } catch (errors) {
            if (errors.name === 'JsonWebTokenError') {
                return res.json(responseError(40004, errors));
            }
            return res.json(responseError(40004, errors));
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const { type } = req.decoded;
            if (type !== TYPE_USER[2]) {
                return res.json(responseError(40006));
            }
            return next();
        } catch (errors) {
            return res.json(responseError(40004, errors));

        }
    },
    isHR: async (req, res, next) => {
        try {
            const { type } = req.decoded;
            if (type !== TYPE_USER[0] && type !== TYPE_USER[2]) {
                return res.json(responseError(40007));
            }
            return next();
        } catch (errors) {
            return res.json(responseError(40004, errors));

        }
    },
}