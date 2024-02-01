
const XKLDCompaniesController = require('../../controllers/XKLDCompaniesController').DEFAULT;

function selectRoute(apiRouter) {
    apiRouter.route('/xkld-companies/list').get(XKLDCompaniesController.list);
}
module.exports = selectRoute;
