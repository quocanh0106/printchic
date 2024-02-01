/**
 * utils
 * @name translate
 */

/**
 * @name getLang
 *
 * @return {String}
 */
const getLang = () => global?.language || 'vi';
const { getMessage, getMessageValidator } = require('./language');

const _m = (code, type) => getMessage(getLang(), type)[code] || '';
const _v = (code) => getMessageValidator(getLang())[code] || '';
module.exports = {
    _m, _v,
};
