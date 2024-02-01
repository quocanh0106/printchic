
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true,
    }));
    app.use(cookieParser());
};
