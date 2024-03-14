
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json({limit:'150mb'})); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true,
        limit:'150mb'
    }));
    app.use(cookieParser());
};
