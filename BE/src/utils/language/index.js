/* eslint-disable import/no-dynamic-require, global-require */
/**
 * utils/languages
 * @name index
 */

const { LANGUAGES } = require('../constants');

/**
 * @name getMessage
 *
 * @param {Any|String} lang
 * @param {String} type //CODES_ERROR || CODES_SUCCESS
 * @return {Object}
 */
const getMessage = (lang, type = 'CODES_SUCCESS') => {
    if (LANGUAGES.includes(lang)) {
        const messages = require(`./${lang}/messages`);
        return messages[type] || {};
    }
    const messages = require('../messages');
    return messages[type] || {};
};
/**
 * @name getMessageValidator
 *
 * @param {Any|String} lang
 * @return {Object}
 */
const getMessageValidator = (lang = 'vi') => {
    const messages = require(`./${lang}/messagesValidator`);
    return messages.CODE_MESSAGE_VALIDATOR || {};
};
module.exports = { getMessage, getMessageValidator };
